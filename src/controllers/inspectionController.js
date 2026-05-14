const Vehicle = require("../models/Vehicle");
const auditService = require("../services/auditServices");
const User = require("../models/User");
const emailService = require("../services/emailService");

exports.startInspection = async (req, res) => {
    try {
        const { id } = req.params;
        const vehicle = await Vehicle.findById(id);
        if (!vehicle) {
            return res.status(404).json({ message: "Vehicle not found" });
        }
        
        if (vehicle.status === "rejected") {
            return res.status(400).json({ message: "Cannot inspect a rejected vehicle" });
        }

        if (vehicle.status === "approved") {
            return res.status(400).json({ message: "Vehicle is already approved" });
        }

        if (vehicle.status !== "under_review") {
            return res.status(400).json({ message: "Vehicle is not under review" });
        }
        vehicle.status = "in_inspection";
        vehicle.inspection.inspectedBy = req.user.id;
        await vehicle.save();

        await auditService.createLog({
            user: req.user.id,
            action: "START_INSPECTION",
            vehicle: vehicle._id
        });

        res.json({ message: "Inspection started", vehicle });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.completeInspection = async (req, res) => {
    try {
        const { id } = req.params;
        const { status, notes } = req.body; 
        const vehicle = await Vehicle.findById(id);
        if (!vehicle) {
            return res.status(404).json({ message: "Vehicle not found" });
        }
        if (vehicle.status !== "in_inspection") {
            return res.status(400).json({ message: "Vehicle is not in inspection" });
        }
        vehicle.inspection.status = status;
        vehicle.inspection.notes = notes;
        vehicle.inspection.inspectedAt = new Date();
        vehicle.status = status === "passed" ? "approved" : "rejected";
        await vehicle.save();

        await auditService.createLog({
            user: req.user.id,
            action: "COMPLETE_INSPECTION",
            vehicle: vehicle._id
        });

        // Send email notification to vehicle owner
        const owner = await User.findById(vehicle.owner);
        if (owner) {
            const result = status === "passed" ? "passed" : "failed";
            await emailService.sendEmail(
                owner.email,
                `Vehicle Inspection ${result.charAt(0).toUpperCase() + result.slice(1)}`,
                `Your vehicle inspection has been completed and ${result}. ${notes ? `Notes: ${notes}` : ''} Please check your dashboard for more details.`
            );
        }

        res.json({ message: "Inspection completed", vehicle });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
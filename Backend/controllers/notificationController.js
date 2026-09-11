import Notification from "../Model/Notifications.js"

export const getNotifications = async (req, res) => {
    try {
        const notifications = await Notification.find({
            user: req.user._id
        }).sort({
            createdAt: -1
        })

        res.json(notifications)

    } catch (err) {

        console.log("GET NOTIFICATIONS ERROR:", err)

        res.status(500).json({
            message: "فشل في جلب الإشعارات"
        })
    }
}


export const markAsRead = async (req, res) => {

    try {

        const notification = await Notification.findByIdAndUpdate(
            req.params.id,
            {
                read: true
            },
            {
                new: true
            }
        )

        if (!notification) {
            return res.status(404).json({
                message: "الإشعار غير موجود"
            })
        }

        res.json({
            success: true,
            notification
        })

    } catch (err) {

        console.log("MARK NOTIFICATION AS READ ERROR:", err)

        res.status(500).json({
            message: "فشل في تحديث الإشعار"
        })
    }
}
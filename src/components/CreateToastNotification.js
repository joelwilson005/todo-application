import toast from "react-hot-toast";

const CreateToastNotification = (type, message, duration, onClose) => {
  switch (type) {
    case "info":
      toast(message, { duration, icon: "🛈" });
      break;
    case "success":
      toast.success(message, { duration, icon: "🎉" });
      break;
    case "warning":
      toast.loading(message, { duration, icon: "⚠️" });
      break;
    case "error":
      toast.error(message, { duration, icon: "❌", onClose });
      break;
    default:
      break;
  }
};
export default CreateToastNotification;

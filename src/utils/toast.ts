import toast from "react-hot-toast";

const handleToast = (type: Number, msg: string) => {
  switch (type) {
    case 1:
      toast.success(msg);
      break;
    default:
      toast.error(msg);
      break;
  }
};

export default handleToast;

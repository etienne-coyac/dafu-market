import { AlarmOn, Done, HourglassTop, Paid } from "@mui/icons-material";
export const getOrderStatusIcon = (status: string) => {
  switch (status) {
    case "PAYE":
      return <Paid color="success" />;
    case "A_PREPARER":
    case "EN_PREPARATION":
      return <HourglassTop color="warning" />;
    case "PRET":
      return <AlarmOn color="success" />;
    default:
      return <Done color="success" />;
  }
};

export const getOrderStatusText = (status: string) => {
  switch (status) {
    case "PAYE":
      return "Payée";
    case "A_PREPARER":
      return "À préparer";
    case "EN_PREPARATION":
      return "En préparation";
    case "PRET":
      return "Prête";
    default:
      return "Terminée";
  }
};

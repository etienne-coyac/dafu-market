import { KeyboardArrowRight } from "@mui/icons-material";
import { Breadcrumbs, Link } from "@mui/joy";
import { Link as RouterLink } from "react-router";

type ProductCardProps = {
  steps: {
    name: string;
    href: string;
  }[];
};
const ProductsBreadcrumbs = (props: ProductCardProps) => {
  const { steps } = props;
  return (
    <Breadcrumbs separator={<KeyboardArrowRight />}>
      <Link component={RouterLink} level="body-xs" color="neutral" to="/">
        Accueil
      </Link>

      {steps.map((step) => (
        <Link
          key={step.name}
          component={RouterLink}
          level="body-xs"
          color="neutral"
          to={step.href}
        >
          {step.name}
        </Link>
      ))}
    </Breadcrumbs>
  );
};

export default ProductsBreadcrumbs;

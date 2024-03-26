import { CSSProperties } from "react";
import TailSpin from "react-spinners/ClipLoader";

type LoadingProps = {
  loading: boolean;
  size: "small" | "large";
  my?: boolean;
};

const Loading = ({ loading, size, my }: LoadingProps) => {
  const override: CSSProperties = {
    display: "block",
    margin: size === "small" ? "0" : my ? "32px auto" : "0 auto",
  };

  return (
    <TailSpin color={"lightblue"} loading={loading} cssOverride={override} size={size === "small" ? 25 : size === "large" ? 100 : 100} aria-label="tail-spin-loading" />
  );
}

export default Loading;
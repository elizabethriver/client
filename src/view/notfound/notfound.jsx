import React from "react";
import { Button } from "../../components/buttons/button";
import { LinkStandard } from "../../components/link/Link";

export const NotFound = () => {
  return (
    <>
      <div>NotFound</div>
      <Button>
        <LinkStandard to="/" children="Go home" />
      </Button>
    </>
  );
};

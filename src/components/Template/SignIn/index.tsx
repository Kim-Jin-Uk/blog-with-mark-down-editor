import Logo from "@/components/Atom/SVG/Logo";
import React, { ReactNode } from "react";

const SignIn = ({ children }: { children: ReactNode }) => {
  return (
    <div className="signin--container">
      <aside className="signin--aside">
        <div className="signin--aside--balck-cover">
          <div className="signin--aside--logo">
            <Logo color="white" width={96} height={96} />
          </div>
        </div>
        <div className="signin--aside--image" />
      </aside>
      <aside className="signin--aside signin--asidie--padding">
        <Logo color="black" width={32} height={32} />
        {children}
      </aside>
    </div>
  );
};

export default SignIn;

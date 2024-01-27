import React, { ReactNode } from "react";

const layout = ({ children }: { children: ReactNode }) => {
  return (
    <main>
      <nav>
        <ul></ul>
      </nav>
      {children}
    </main>
  );
};

export default layout;

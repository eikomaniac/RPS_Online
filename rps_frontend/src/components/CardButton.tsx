import React, { FC, ReactElement } from "react";
import { Link } from "react-router-dom";
import { IconContext } from "react-icons";

interface CardButtonProps {
  linkTo: string;
  icon: ReactElement;
  title: string;
  subtitle: string;
}

const NoPage: FC<CardButtonProps> = ({ linkTo, icon, title, subtitle }) => {
  return (
    <Link to={linkTo}>
      <button className="card-button btn btn-outline-secondary h-100 p-4 border rounded-3">
        <h2 className="text-center">{title}</h2>
        <span>{subtitle}</span>
        <IconContext.Provider value={{ className: "rounded mx-auto d-block w-75 h-75 mb-3" }}>
          {icon}
        </IconContext.Provider>
      </button>
    </Link>
  );
};

export default NoPage;
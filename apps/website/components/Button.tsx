/* eslint-disable */
"use client";

// import { block } from "million/react";
import * as styles from "./Button.css";
import React from "react";

/* eslint-disable */

/* eslint-disable */

const ButtonComp: React.FC = ({
	children,
	onClick,
}: {
	children: any;
	onClick: () => void;
}) => {
	return (
		<button className={styles.button} onClick={onClick}>
			<div>{children}</div>
		</button>
	);
};

// const Button = block(ButtonComp);

export default ButtonComp;

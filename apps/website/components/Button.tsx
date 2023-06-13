/* eslint-disable */
"use client";

// import { block } from "million/react";
import * as styles from "./Button.css";

/* eslint-disable */

const ButtonComp = ({ children, onClick }: { children: any; onClick: any }) => {
	return (
		<button className={styles.button} onClick={onClick}>
			{children}
		</button>
	);
};

// const Button = block(ButtonComp);

export default ButtonComp;

import React from "react";
import ResponsiveAppBar from "./AppBar";

interface ILayoutProps {
	children?: React.ReactNode;
}

export const Bar = (props: ILayoutProps) => {
	const { children } = props;
	return (
		<div>
			<ResponsiveAppBar />
			<div>{children}</div>
		</div>
	);
};

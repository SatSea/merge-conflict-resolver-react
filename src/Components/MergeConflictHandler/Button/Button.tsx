import styled from "@emotion/styled";
import React, { HTMLAttributes, ReactElement } from "react";
import { ButtonStyle } from "./ButtonStyle";
import BaseButton from "./Styles/Base";
import Orange from "./Styles/Orange";
import Transparent from "./Styles/Transparent";
import TopMerge from "./Styles/TopMerge";
import BottomMerge from "./Styles/BottomMerge";

const Buttons: { [buttonStyle in ButtonStyle]: (...props: any) => any } = {
	orange: Orange,
	default: BaseButton,
	transparent: Transparent,
	TopMerge: TopMerge,
	BottomMerge: BottomMerge,
};

const Button = styled(
	({
		style = ButtonStyle.default,
		className,
		...props
	}: {
		style?: ButtonStyle;
		disabled?: boolean;
		className?: string;
	} & HTMLAttributes<HTMLDivElement>) => {
		return (
			<div className={className}>
				{Buttons[style].render({ ...props, useDefaultStyle: style == ButtonStyle.default })}
			</div>
		);
	}
)`
	${(p) => (p.disabled ? `pointer-events: none; opacity: 0.4;` : ``)}
`;

export default Button;

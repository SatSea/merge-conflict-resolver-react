import styled from "@emotion/styled";
import { HTMLAttributes } from "react";
import Button from "./Base";

const Transparent = styled(
	({
		children,
		className,
		...props
	}: {
		children: JSX.Element | string;
		className?: string;
	} & HTMLAttributes<HTMLDivElement>) => {
		return (
			<div className={className}>
				<div className="button button-cancel">
					<Button {...props}>{children}</Button>
				</div>
			</div>
		);
	}
)`
	width: fit-content;

	.button-cancel {
		color: var(--color-primary-general);
		font-weight: 300;
		font-size: 14px;
	}

	.button-cancel:hover {
		text-decoration: underline;
		color: var(--color-primary);
		background: none;
	}
`;

export default Transparent;

import styled from "@emotion/styled";
import { HTMLAttributes } from "react";
import Button from "./Base";

const BottomMerge = styled(
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
				<div className="bottom-merge-button">
					<Button {...props}>{children}</Button>
				</div>
			</div>
		);
	}
)`
	width: fit-content;

	.bottom-merge-button {
		width: fit-content;
		background: #d338f8;
		color: white !important;
		border: 1px solid var(--color-text-accent);
		border-radius: var(--radius-block);
	}
	.bottom-merge-button > i::after {
		opacity: 1;
	}

	.bottom-merge-button:hover {
		text-decoration: none !important;
		color: #d338f8 !important;
		background: white;
	}
`;

export default BottomMerge;

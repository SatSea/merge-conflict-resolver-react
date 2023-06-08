import styled from "@emotion/styled";
import { HTMLAttributes } from "react";
import Button from "./Base";

const TopMerge = styled(
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
				<div className="top-merge-button">
					<Button {...props}>{children}</Button>
				</div>
			</div>
		);
	}
)`
	width: fit-content;

	.top-merge-button {
		width: fit-content;
		background: #3a9ffb;
		color: white !important;
		border: 1px solid var(--color-text-accent);
		border-radius: var(--radius-block);
	}
	.top-merge-button > i::after {
		opacity: 1;
	}

	.top-merge-button:hover {
		text-decoration: none !important;
		color: #3a9ffb !important;
		background: white;
	}
`;

export default TopMerge;

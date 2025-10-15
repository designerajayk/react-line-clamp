import type React from "react";
import { useCallback, useEffect, useRef, useState } from "react";

export interface LineClampProps {
	/**
	 * The content to be clamped
	 */
	children: React.ReactNode;
	/**
	 * Maximum number of lines to display
	 */
	lines: number;
	/**
	 * Additional CSS classes
	 */
	className?: string;
	/**
	 * Custom styles
	 */
	style?: React.CSSProperties;
	/**
	 * Text to show when content is expanded (e.g., "Show less")
	 */
	collapseText?: string;
	/**
	 * Text to show when content is clamped (e.g., "Show more", "Read more")
	 */
	expandText?: string;
	/**
	 * Whether to show expand/collapse buttons
	 */
	showButton?: boolean;
	/**
	 * Custom button component
	 */
	buttonComponent?: React.ComponentType<{
		onClick: () => void;
		children: React.ReactNode;
	}>;
	/**
	 * Callback when expand/collapse state changes
	 */
	onToggle?: (expanded: boolean) => void;
	/**
	 * Whether the text should be expanded by default
	 */
	expanded?: boolean;
}

const LineClamp: React.FC<LineClampProps> = ({
	children,
	lines,
	className = "",
	style = {},
	collapseText = "Show less",
	expandText = "Show more",
	showButton = true,
	buttonComponent: CustomButton,
	onToggle,
	expanded: controlledExpanded,
}) => {
	const [isExpanded, setIsExpanded] = useState(controlledExpanded || false);
	const [isClamped, setIsClamped] = useState(false);
	const textRef = useRef<HTMLDivElement>(null);

	// Check if content is actually clamped
	const checkIfClamped = useCallback(() => {
		if (!textRef.current) return;

		// Simple approach: compare scrollHeight with clientHeight
		// When content is clamped, scrollHeight will be greater than clientHeight
		const element = textRef.current;
		setIsClamped(element.scrollHeight > element.clientHeight);
	}, []);

	useEffect(() => {
		if (!children) {
			setIsClamped(false);
			return;
		}

		checkIfClamped();

		const handleResize = () => {
			checkIfClamped();
		};

		window.addEventListener("resize", handleResize);
		return () => window.removeEventListener("resize", handleResize);
	}, [checkIfClamped, children]);

	useEffect(() => {
		if (controlledExpanded !== undefined) {
			setIsExpanded(controlledExpanded);
		}
	}, [controlledExpanded]);

	const handleToggle = () => {
		const newExpanded = !isExpanded;
		if (controlledExpanded === undefined) {
			setIsExpanded(newExpanded);
		}
		onToggle?.(newExpanded);
	};

	const clampedStyle: React.CSSProperties = {
		display: "-webkit-box",
		WebkitLineClamp: lines,
		overflow: "hidden",
		wordBreak: "break-word",
		...style,
		// Add the required webkit-box-orient via CSS custom property
		// This avoids using the deprecated property directly in JS
	} as React.CSSProperties & { WebkitBoxOrient: string };

	// Apply webkit-box-orient through a ref effect instead of inline styles
	useEffect(() => {
		if (textRef.current && !isExpanded) {
			textRef.current.style.webkitBoxOrient = "vertical";
		}
	}, [isExpanded]);

	const expandedStyle: React.CSSProperties = {
		wordBreak: "break-word",
		...style,
	};

	const ButtonComponent = CustomButton || "button";

	return (
		<>
			<div
				ref={textRef}
				className={className}
				style={isExpanded ? expandedStyle : clampedStyle}
			>
				{children}
			</div>
			{showButton && isClamped && (
				<ButtonComponent
					onClick={handleToggle}
					style={{
						background: "none",
						border: "none",
						color: "#007bff",
						cursor: "pointer",
						padding: 0,
						textDecoration: "underline",
						marginTop: "4px",
						...(!CustomButton && { fontSize: "inherit" }),
					}}
				>
					{isExpanded ? collapseText : expandText}
				</ButtonComponent>
			)}
		</>
	);
};

export default LineClamp;

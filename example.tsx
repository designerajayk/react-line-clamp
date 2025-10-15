import type React from "react";
import { useState } from "react";
import LineClamp from "./index";

const CustomButton: React.FC<{
	onClick: () => void;
	children: React.ReactNode;
}> = ({ onClick, children }) => (
	<button
		type="button"
		onClick={onClick}
		style={{
			background: "#007bff",
			color: "white",
			border: "none",
			padding: "4px 8px",
			borderRadius: "4px",
			cursor: "pointer",
			marginTop: "8px",
		}}
	>
		{children}
	</button>
);

const ExampleApp: React.FC = () => {
	const [expanded, setExpanded] = useState(false);

	const longText = `
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor
    incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
    exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute
    irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
    pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia
    deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error
    sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae
    ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.
  `;

	return (
		<div style={{ maxWidth: "600px", margin: "0 auto", padding: "20px" }}>
			<h1>React Line Clamp Examples</h1>

			<section style={{ marginBottom: "40px" }}>
				<h2>Basic Example (3 lines)</h2>
				<LineClamp lines={3}>{longText}</LineClamp>
			</section>

			<section style={{ marginBottom: "40px" }}>
				<h2>Custom Expand/Collapse Text</h2>
				<LineClamp
					lines={2}
					expandText="Read more +"
					collapseText="Show less -"
				>
					{longText}
				</LineClamp>
			</section>

			<section style={{ marginBottom: "40px" }}>
				<h2>Without Toggle Button</h2>
				<LineClamp lines={3} showButton={false}>
					{longText}
				</LineClamp>
			</section>

			<section style={{ marginBottom: "40px" }}>
				<h2>With Custom Styling</h2>
				<LineClamp
					lines={3}
					style={{
						fontSize: "18px",
						lineHeight: "1.6",
						color: "#333",
						backgroundColor: "#f8f9fa",
						padding: "16px",
						borderRadius: "8px",
					}}
				>
					{longText}
				</LineClamp>
			</section>

			<section style={{ marginBottom: "40px" }}>
				<h2>With Rich Content</h2>
				<LineClamp lines={3}>
					<p>
						<strong>Rich content support!</strong> This component now supports
						complex markup.
					</p>
					<p>
						You can include <em>emphasis</em>,{" "}
						<a href="/example" style={{ color: "#007bff" }}>
							links
						</a>
						, and other elements.
					</p>
					<p>
						Perfect for blog previews, product descriptions, and more complex
						layouts with multiple paragraphs and formatting.
					</p>
				</LineClamp>
			</section>

			<section style={{ marginBottom: "40px" }}>
				<h2>Controlled Mode</h2>
				<p>
					External control:
					<button
						type="button"
						onClick={() => setExpanded(!expanded)}
						style={{ marginLeft: "8px" }}
					>
						{expanded ? "Collapse" : "Expand"}
					</button>
				</p>
				<LineClamp lines={3} expanded={expanded} onToggle={setExpanded}>
					{longText}
				</LineClamp>
			</section>

			<section style={{ marginBottom: "40px" }}>
				<h2>Custom Button Component</h2>
				<LineClamp
					lines={3}
					buttonComponent={CustomButton}
					expandText="📖 Read full text"
					collapseText="📝 Show summary"
				>
					{longText}
				</LineClamp>
			</section>
		</div>
	);
};

export default ExampleApp;

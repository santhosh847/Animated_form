const start =
	"M0 0.999512C0 0.999512 60.5 0.999512 150 0.999512C239.5 0.999512 300 0.999512 300 0.999512";
const end =
	"M1 0.999512C1 0.999512 61.5 7.5 151 7.5C240.5 7.5 301 0.999512 301 0.999512";
const tl = gsap.timeline({ default: { duration: 0.75 } });
const containers = document.querySelectorAll(".input-container");
containers.forEach((container) => {
	const placeholder = container.querySelector(".placeholder");
	const input = container.querySelector(".input");
	const line = container.querySelector(".elastic-line");

	//bounce effect
	input.addEventListener("focus", () => {
		if (!input.value) {
			tl.to(line, { attr: { d: end }, duration: 0.4, ease: "Power2.easeOut" });
			tl.to(line, { attr: { d: start }, ease: "elastic.out(3,0.5)" }, "<50%");
			tl.to(placeholder, { top: -15, scale: 0.7 }, "<12%");
		}
	});

	//revert placeholder
	document.addEventListener("click", () => {
		if (document.activeElement !== input) {
			if (!input.value) {
				gsap.to(placeholder, {
					top: 0,
					left: 0,
					scale: 1,
					duration: 0.3,
					ease: "Power2.easeOut",
				});
			}
		}
	});

	//validation
	input.addEventListener("input", (evt) => {
		if (evt.target.type == "text") {
			if (evt.target.value.length > 2) {
				colorize("#6391E8", line, placeholder);
			} else {
				colorize("#FE8C99", line, placeholder);
			}
		} else if (evt.target.type === "email") {
			if (validateEmail(evt.target.value)) {
				colorize("#6391E8", line, placeholder);
			} else {
				colorize("#FE8C99", line, placeholder);
			}
		} else if (evt.target.type === "tel") {
			if (validateNumber(evt.target.value)) {
				colorize("#6391E8", line, placeholder);
			} else {
				colorize("#FE8C99", line, placeholder);
			}
		}
	});
});

function colorize(color, line, placeholder) {
	gsap.to(line, { stroke: color });
	gsap.to(placeholder, { color });
}

function validateEmail(email) {
	let re = /^[\w\.]+@([\w]+\.)+[\w]{2,4}$/;
	return re.test(email);
}

function validateNumber(number) {
	return number > 999999999 && number < 10000000000;
}

const checkbox = document.querySelector(".checkbox");
const checkfill = document.querySelector(".checkbox-fill");
const tick = document.querySelector(".tick-mark path");
const pathLength = tick.getTotalLength();
gsap.set(tick, { strokeDashoffset: pathLength, strokeDasharray: pathLength });
checkbox.addEventListener("click", (evt) => {
	if (checkbox.checked) {
		gsap.to(checkfill, { top: 0, duration: 0.4 });
		gsap.fromTo(
			tick,
			{ strokeDashoffset: pathLength },
			{ strokeDashoffset: 0, duration: 0.4 },
			"<50%"
		);
	} else {
		gsap.fromTo(
			tick,
			{ strokeDashoffset: 0 },
			{ strokeDashoffset: pathLength, duration: 0.4 }
		);
		gsap.to(checkfill, { top: "100%", duration: 0.4 }, "<50%");
	}
});
// document.addEventListener(
// 	"DOMContentLoaded",
// 	setTimeout(() => {
// 		const eye = document.querySelectorAll("#eye");
// 		gsap.set(eye, { transformOrigin: "center" });
// 		gsap.to(eye, {
// 			scale: 0.1,
// 			repeat: -1,
// 			yoyo: true,
// 			repeatDelay: 0.4,
// 			ease: "Power2.easeOut",
// 		});
// 	}, 300)
// );

const eye = document.querySelectorAll("#eye");
gsap.set(eye, { transformOrigin: "center" });
gsap.to(eye, {
	scale: 0.3,
	repeat: -1,
	yoyo: true,
	repeatDelay: 0.4,
	ease: "Power2.easeOut",
});
gsap.to("#left-eyebrow, #right-eyebrow", {
	y: -1,
	repeat: -1,
	yoyo: true,
	repeatDelay: 0.4,
	ease: "Power2.easeOut",
});

const tl3 = gsap.timeline({
	defaults: { duration: 0.4, ease: "Power2.easeOut" },
});
gsap.set("#hand", { transformOrigin: "left" });
const button = document.querySelector("button");
button.addEventListener("click", (evt) => {
	evt.preventDefault();
	tl3.to(".contact-right, .contact-left", {
		y: 30,
		opacity: 0,
		pointerEvents: "none",
	});
	tl3.to("form", { scale: 0.7 }, "<");
	tl3.fromTo("#submitted", { y: 30 }, { y: 0, opacity: 1 });
	tl3.to("#hand", {
		rotation: -10,
		ease: "elastic.out(3, 0.3)",
		duration: 1.5,
	});
});

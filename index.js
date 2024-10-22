input = document.querySelector("#imageUpload");
btn = document.querySelector("#convertGrayscale");
uploadImg = document.getElementById("uploadedImage");

const fun = (e) => {
	const reader = new FileReader();
	reader.onload = function () {
		uploadImg.src = reader.result;
	};
	reader.readAsDataURL(e.target.files[0]);
};

const convertToGrayscale = () => {
	if (uploadImg.hasAttribute("src")) {
		const canvas = document.getElementById("grayscaleImage");
		const ctx = canvas.getContext("2d");

		canvas.width = uploadImg.width;
		canvas.height = uploadImg.height;

		ctx.drawImage(uploadImg, 0, 0, canvas.width, canvas.height);
		const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
		const data = imageData.data;

		for (i = 0; i < data.length; i += 4) {
			const red = data[i];
			const green = data[i + 1];
			const blue = data[i + 2];

			const grayscale = 0.3 * red + 0.59 * green + 0.11 * blue;

			data[i] = grayscale;
			data[i + 2] = grayscale;
			data[i + 1] = grayscale;
		}
		ctx.putImageData(imageData, 0, 0);
	}
};

btn.addEventListener("click", convertToGrayscale);
input.addEventListener("change", fun);
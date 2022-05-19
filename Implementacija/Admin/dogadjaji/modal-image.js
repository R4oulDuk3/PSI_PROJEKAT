const image_input = document.querySelector("#image_input");
var uploaded_image = null;
var uploaded_image_url = null;
image_input.addEventListener("change", function() {
  const reader = new FileReader();
  reader.addEventListener("load", () => {
    uploaded_image = reader.result;
    
    document.querySelector("#display_image").style.backgroundImage = `url(${uploaded_image})`;
  });
  uploaded_image_url=URL.createObjectURL(this.files[0])
  reader.readAsDataURL(this.files[0]);
   
});






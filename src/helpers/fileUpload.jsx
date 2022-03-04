export const fileUpload = async (file) => {
  const cloudUrl =
    "https://365688834343767:kXtjvGvFl6biMfbstfMunob-XCg@api.cloudinary.com/v1_1/dwxvqq7v9/upload";
  const formdata = new FormData();
  formdata.append("file", file);
  formdata.append("upload_preset", "reactjournal");
  try {
    const params = {
      method: "POST",
      headers: {
        "Content-Type": "multipart/form-data",
      },
      body: formdata,
    };
    const resp = await fetch(cloudUrl, params);
    if (resp.ok) {
      const cloudResp = await resp.json();
      return cloudResp;
    } else {
      throw await resp.json();
    }
  } catch (error) {
    console.log(error);
  }
};

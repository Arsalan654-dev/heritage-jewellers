/* source: assets/js/apo-file-341c7168.js */
function handleFile() {
  let isShopUploadCdnSpf = ["65746239548", "61691986178"].includes(
    //"65088847929",
    window.ap_front_settings.shop_id
  );
  var file = function (
    formContainer,
    productId,
    productInfo,
    elem,
    options,
    $,
    createAvisContainerHidden,
    variantChange,
    urlDefault,
    fileFlag,
    isNewValidateShop,
    isShopUploadShopfiy,
    eventListnerSwatchPersonalizer
  ) {
    var opts = typeof options === "function" ? options() : options;
    return apoFile(
      formContainer,
      productId,
      productInfo,
      elem,
      opts,
      $,
      createAvisContainerHidden,
      variantChange,
      urlDefault,
      fileFlag,
      isNewValidateShop,
      isShopUploadShopfiy,
      eventListnerSwatchPersonalizer
    );
  };
  file.fileVer = "V1.0.0";
  function apoFile(
    formContainer,
    productId,
    productInfo,
    elem,
    optionInfo,
    $,
    createAvisContainerHidden,
    variantChange,
    urlDefault,
    fileFlag,
    isNewValidateShop,
    isShopUploadShopfiy,
    eventListnerSwatchPersonalizer
  ) {
    const selectedFiles = [];
    const id = elem.replace("#", "");
    let {
      is_cropper: isCropper,
      is_multi_files: isMultiFiles,
      max_file_size,
      min_file_size,
      max_file_upload,
      option_file_type,
      option_file_type_custom,
      aspect_ratio_cropper,
    } = fileFlag;
    let isOnEditOption = false;
    let cropper; // Save Cropper instance
    let currentFile; // Save the current file object
    let croppedFileUrl; // Save the cropped file URL after cropping
    let currentZoomRatio = 1; // Initialize the current zoom ratio
    const maxZoomRatio = 3; // Maximum zoom ratio
    const minZoomRatio = 1; // Minimum zoom ratio

    const appPlan = window.ap_front_settings.config.config_app["appPlan"];
    if (["OLD", "FREE",  "BASIC", "PRO"].includes(appPlan) && Number(max_file_size) > 20) {
      max_file_size = 20;
    } 

    var apoFileInput = document.querySelector(`${elem}`);
    if (!apoFileInput) return;

    let optionNameInput = apoFileInput.name;
    let wrapperInput = apoFileInput.closest(".apo-file");
    if (wrapperInput) {
      let fileValueSelector = wrapperInput.querySelector(".apo_value");
      if (fileValueSelector?.name) optionNameInput = fileValueSelector?.name;
    }

    if (window.ap_front_settings.config.config_app["appPlan"] !== "OLD") {
      function podFile() {
        let fileValueSelector = wrapperInput.querySelector(".apo_value");
        if(optionInfo) {
          eventListnerSwatchPersonalizer(optionInfo?.key, optionInfo, null, fileValueSelector?.value?.split(",")?.[fileValueSelector?.value?.split(",").length - 1] ?? "", true);
        }
      }
    }

    const generateHiddenInputs = (array, prefix) => {
      const isWidgetLayoutDefault = (ap_front_settings?.config?.config_app?.widget?.layout || "default") === "default"
      removeHiddenInput(prefix);

      var propertiesColorsContainer = document.querySelector(
        isWidgetLayoutDefault ? `input[name="properties[${prefix}]"]` : `form.avis-popup-atc-form input[name="properties[${prefix}]"]`
      )
      var parentElement = propertiesColorsContainer.parentElement;

      for (let i = array.length - 1; i >= 0; i--) {
        var newInput = document.createElement("input");
        newInput.type = "hidden";
        newInput.name = "properties[" + array[i].className + "]";
        newInput.value = array[i].url;
        newInput.setAttribute("data-parent", prefix);
        parentElement.insertBefore(
          newInput,
          propertiesColorsContainer.nextSibling
        );
      }
    };

    const removeHiddenInput = (prefix) => {
      const isWidgetLayoutDefault = (ap_front_settings?.config?.config_app?.widget?.layout || "default") === "default"
      var propertiesInputs = document.querySelectorAll(
        isWidgetLayoutDefault ? `input[name^="properties[${prefix}-"]` : `form.avis-popup-atc-form input[name^="properties[${prefix}-"]`
      );
      // const propertiesTempInputs = document.querySelectorAll(
      //   `input[temp-name^="[${prefix}"]`
      // );
      // propertiesTempInputs.forEach(function (input) {
      //   input.remove();
      // });
      propertiesInputs.forEach(function (input) {
        input.remove();
      });
    };

    const getFileName = (url) => {
      let decodedUrl = decodeURIComponent(url);
      let segments = decodedUrl.split("/");
      let fullFileName = segments[segments.length - 1];
      let fileNameParts = fullFileName.split("_");
      return fileNameParts.slice(1).join("_");
    };

    let handleMultiFile = (selectedFiles) => {
      const loader = document.querySelector(
        `label[for="${elem.replace(/^#/, "")}"] ~ .apo-file__img .apo-loader`
      );
      const preview = document.querySelector(
        `${elem} + s.apo-file__img .apo-items__preview`
      );
      document
        .querySelector(`input[name="properties[${optionNameInput}]"]`)
        ?.removeAttribute("value");

      if (loader) loader.classList.add("hidden");
      if (preview) preview.classList.remove("hidden");

      const previewContainer = $(`#${id}-multiple-upload-preview`);
      previewContainer.empty();

      selectedFiles.forEach((file, index) => {
        file.className = `${optionNameInput}-${index + 1}`;
        const imgElement = isVideoUrl(file?.url) ? createVideoLink(file?.url) : $("<a>", {
          href: file.url,
          target: "_blank",
          css: {
            "background-image": `url(${
              file?.url ? new URL(file.url).href : ""
            })`,
          },
        });
        const cardElement = $("<div>").addClass("apo-card__loader");
        const fileInfoElement = $("<div>").addClass("apo-item__info");
        const fileName = $("<span>").addClass("apo-item__name").text(file.name);
        const divElement = $("<div>")
          .addClass("apo-label__image-preview")
          .append(imgElement);
        const removeButton = $("<span>")
          .html("&times;")
          .addClass("apo-item__remove")
          .click(function () {
            removeFileForMultiUpload(index, selectedFiles);
          });

        let apoFileText =
          /(\.csv|\.docx|\.pdf|\.xls|\.xlms|\.xlsx|\.txt|\.ai|\.eps|\.psd|\.dng)$/i;
        if (!apoFileText.exec(file.name)) {
          cardElement.append(divElement);
        }
        fileInfoElement.append(fileName);
        fileInfoElement.append(removeButton);
        cardElement.append(fileInfoElement);
        previewContainer.append(cardElement);
      });

      //
      let wrapper = apoFileInput.closest(".apo-file");
      if (wrapper) {
        let fileValueSelector = wrapper.querySelector(".apo_value");
        if (fileValueSelector) {
          fileValueSelector.value = selectedFiles
            .map((file) => file.url)
            .join();
        }

        if (window.ap_front_settings.config.config_app["appPlan"] !== "OLD") podFile();
        if (variantChange) {
          variantChange(
            optionNameInput,
            [$(wrapper)],
            productId,
            formContainer
          );
        }
      }
      //

      generateHiddenInputs(selectedFiles, optionNameInput);
      createAvisContainerHidden(formContainer, productId, optionNameInput);
    };

    function isVideoUrl(url) {
      return /\.(mp4)(\?.*)?$/i.test(url);
    }

    function createVideoLink(videoUrl) {
      const $a = $("<a>", {
        href: videoUrl,
        target: "_blank"
      });

      const $video = $("<video>", {
        src: videoUrl,
        preload: "metadata",
        playsinline: true,
        muted: true,
        css: {
          width: "75px",
          height: "75px",
          borderRadius: "4px",
          objectFit: "cover"
        }
      });

      $a.append($video);
      return $a;
    }
    const handleSingleFile = (file) => {
      croppedFileUrl = file?.url;
      const loader = document.querySelector(
        `${elem} + .apo-file__img .apo-loader`
      );
      const preview = document.querySelector(
        `${elem} + .apo-file__img .apo-items__preview`
      );

      if (loader) loader.classList.add("hidden");
      if (preview) preview.classList.remove("hidden");

      const previewContainer = $(`#${id}-single-upload-preview`);
      previewContainer.empty();

      //create preview
      const imgElement = isVideoUrl(file?.url) ? createVideoLink(file?.url) : $("<a>", {
        href: file?.url,
        target: "_blank",
        css: {
          "background-image": `url(${file?.url ? new URL(file.url).href : ""})`,
        },
      });
      const cardElement = $("<div>").addClass("apo-card__loader");
      let textResize = "";
      if (window.ap_front_settings.shop_id === "48947986582") {
        textResize = "Personalizar imagen";
      } else {
        const configApp = window.ap_front_settings.config.config_app;
        textResize = configApp.re_customize_image ? configApp.re_customize_image : "Re-customize image";
      }
      const reCropButtonElement = $("<button>")
        .addClass("apo-item__crop")
        .val("Recustomize")
        .text(textResize)
        .click(function (e) {
          e.preventDefault();
          handleRecustomize();
        });
      const actionElement = $("<div>")
        .addClass("apo-item__action")
        .append(reCropButtonElement);
      const fileInfoElement = $("<div>").addClass("apo-item__info");
      const fileName = $("<span>")
        .addClass("apo-item__name")
        .text(
          isShopUploadShopfiy && !isMultiFiles ? file?.[0]?.name : file?.name
        );
      const divElement = $("<div>").addClass("apo-label__image-preview");

      if (isShopUploadShopfiy && file && !isMultiFiles) {
        const reader = new FileReader();
        reader.onload = function (e) {
          let imgElem = $("<img />", {
            src: e.target.result,
            alt: file?.[0].name,
            height: "50px",
            width: "auto",
          });
          divElement.append(imgElem);
        };
        reader.readAsDataURL(file?.[0]);
        handleUndisabledBtnAddToCart();
      } else {
        divElement.append(imgElement);
      }

      const removeButton = $("<span>")
        .html("&times;")
        .addClass("apo-item__remove")
        .click(function () {
          removeFileForSingleUpload();
        });

      let apoFileText =
        /(\.tif|\.tiff|\.csv|\.docx|\.pdf|\.xls|\.xlms|\.xlsx|\.txt|\.ai|\.eps|\.psd|\.dng)$/i;
      if (!apoFileText.exec(file?.name)) {
        cardElement.append(divElement);
      }
      fileInfoElement.append(fileName);
      fileInfoElement.append(removeButton);
      cardElement.append(fileInfoElement);
      previewContainer.append(cardElement);
      if (isCropper && !isOnEditOption) {
        previewContainer.append(actionElement);
      }
      //
      let wrapper = apoFileInput.closest(".apo-file");
      if (wrapper) {
        let fileValueSelector = wrapper.querySelector(".apo_value");
        if (fileValueSelector) {
          fileValueSelector.value = file?.url;
        }

        let nameOption = fileValueSelector.name
          ? fileValueSelector.name
          : apoFileInput.name;
        if (window.ap_front_settings.config.config_app["appPlan"] !== "OLD") podFile();
        if (variantChange) {
          variantChange(nameOption, [$(wrapper)], productId, formContainer);
        }
        // let valueText = file?.url;
        // if (!["72588165421"].includes(window.ap_front_settings.shop_id) && optionInfo?.option_values?.[0] && valueText && AvisOptionsConfig?.priceMod) {
        //   optionInfo.option_values[0].value = valueText;
        //   valueText = AvisOptionsConfig.priceMod.getValueText(optionInfo.option_values[0], optionInfo)?.value ?? valueText;
        // }
        if (!isShopUploadShopfiy || isMultiFiles) {
          if (formContainer) {
            createAvisContainerHidden(
              formContainer,
              productId,
              nameOption,
              file?.url
            );
          } else createAvisContainerHidden(nameOption, file?.url);
        }
      }
      //
    };

    let removeFileForSingleUpload = () => {
      document.querySelector(`${elem} + .apo-file__img`).remove();
      apoFileInput.value = "";
      croppedFileUrl = null;
      currentFile = null;
      //
      let wrapper = apoFileInput.closest(".apo-file");
      if (wrapper) {
        let fileValueSelector = wrapper.querySelector(".apo_value");
        if (fileValueSelector) {
          fileValueSelector.value = "";
          fileValueSelector.dispatchEvent(new Event('change'));
        }
        let fileValueSelector2 = wrapper.querySelector(".avp-file__input");
        if (fileValueSelector2) {
          fileValueSelector2.value = "";
          fileValueSelector2.dispatchEvent(new Event('change'));
        }
        let nameOption = fileValueSelector.name
          ? fileValueSelector.name
          : apoFileInput.name;
        if (window.ap_front_settings.config.config_app["appPlan"] !== "OLD") podFile();
        if (variantChange) {
          variantChange(nameOption, [$(wrapper)], productId, formContainer);
        }
        createAvisContainerHidden(formContainer, productId, nameOption, "");
      }
      //
    };

    let removeFileForMultiUpload = (index, selectedFiles) => {
      selectedFiles.splice(index, 1);
      removeHiddenInput(optionNameInput);
      if (selectedFiles.length === 0) {
        document.querySelector(`${elem} + .apo-file__img`).remove();
        apoFileInput.value = "";
        //
        let wrapper = apoFileInput.closest(".apo-file");
        if (wrapper) {
          let fileValueSelector = wrapper.querySelector(".apo_value");
          if (fileValueSelector) {
            fileValueSelector.value = "";
          }
          let nameOption = fileValueSelector.name
            ? fileValueSelector.name
            : apoFileInput.name;
          if (window.ap_front_settings.config.config_app["appPlan"] !== "OLD") podFile();
          if (variantChange) {
            variantChange(nameOption, [$(wrapper)], productId, formContainer);
          }
        }
        //
      }
      
      apoFileInput.setAttribute("length-files", selectedFiles.length)
      
      handleMultiFile(selectedFiles);
    };

    function handleCancelModal() {
      //Hide the loader
      const loader = document.querySelector(
        `${elem} + .apo-file__img .apo-loader`
      );
      if (loader) loader.classList.add("hidden");

      // Hide the modal
      document.getElementById(`${id}-apo-crop-modal`).style.display = "none";

      // Reset the image src
      document.getElementById(`${id}-image`).src = currentFile?.src;

      // Reset input value
      apoFileInput.value = "";

      // Destroy the Cropper instance
      if (cropper) {
        cropper.destroy();
        cropper = null;
      }

      // Create hidden input
      createAvisContainerHidden(
        formContainer,
        productId,
        optionNameInput,
        croppedFileUrl ? croppedFileUrl : ""
      );

      // Undisabled button add to cart
      handleUndisabledBtnAddToCart();
    }

    function handleZoomIn() {
      if (cropper && currentZoomRatio < maxZoomRatio) {
        const zoomStep = 0.2; // Zoom in by 20%
        const newZoomRatio = currentZoomRatio + zoomStep;

        if (newZoomRatio <= maxZoomRatio) {
          cropper.zoom(zoomStep);
          currentZoomRatio = newZoomRatio;
        } else {
          // Optional: Zoom in exactly to the max instead of not zooming
          const exactZoom = maxZoomRatio - currentZoomRatio;
          cropper.zoom(exactZoom);
          currentZoomRatio = maxZoomRatio;
        }
      }
    }

    function handleZoomOut() {
      if (cropper && currentZoomRatio > minZoomRatio) {
        const zoomStep = -0.2; // Zoom out by 20%
        const newZoomRatio = currentZoomRatio + zoomStep;
        if (newZoomRatio >= minZoomRatio) {
          cropper.zoom(zoomStep);
          currentZoomRatio = newZoomRatio;
        } else {
          const exactZoom = minZoomRatio - currentZoomRatio;
          cropper.zoom(exactZoom);
          currentZoomRatio = minZoomRatio;
        }
      }
    }

    function handleCropImage(res) {
      let MIN_CROP_WIDTH = 100; // Minimum width allowed for cropping
      let MIN_CROP_HEIGHT = 100; // Minimum height allowed for cropping

      if (window.ap_front_settings.shop_id === "92159181184") {
        MIN_CROP_WIDTH = 300;
        MIN_CROP_HEIGHT = 300;
      }

      const cropBoxData = cropper.getData();

      if (
        cropBoxData.width < MIN_CROP_WIDTH ||
        cropBoxData.height < MIN_CROP_HEIGHT
      ) {
        alert("The cropped area is too small. Please select a larger area.");
        return;
      }

      // handle recrop image
      if (res)
        currentFile = {
          name: res.name,
          type: res.type,
          src: document.getElementById(`${id}-image`).src,
        };

      const isImg = document.querySelector(`${elem} + .apo-file__img`);
      if (isImg) isImg.remove();

      const html = `<div class="apo-file__img">
              <div class="apo-loader"></div>
              <div class="apo-items__preview" id="${id}-single-upload-preview" hidden">

              </div>

              </div>`;
      apoFileInput.insertAdjacentHTML("afterend", html);

      // Get the result of the cropping action
      const croppedCanvas = cropper.getCroppedCanvas();
      document.getElementById(`${id}-apo-crop-modal`).style.display = "none";

      // Convert the canvas to a data URL and create an image element to display
      croppedCanvas.toBlob((blob) => {
        const formData = new FormData();

        formData.append("files", blob, currentFile.name);
        formData.append("name", currentFile.name);
        formData.append("type", currentFile.type);

        fetch(
          "https://apo-api.avisplus.io/api/sf/upload-file?shop_id=" +
            window.ap_front_settings.shop_id,
          {
            method: "POST",
            mode: "cors",
            body: formData,
          }
        )
          .then((e) => e.json())
          .then((t) => {
            cropper.destroy();
            // Reset input value
            apoFileInput.value = "";
            handleSingleFile(t);
          })
          .finally(() => {
            handleUndisabledBtnAddToCart();
          });
      }, currentFile.type);
    }

    function handleRecustomize() {
      document.querySelector(`.${id}.apo-custom-crop-modal`).style.display =
        "flex";

      let aspectRatio = NaN;
      if (window.ap_front_settings.shop_id === "92159181184") {
        aspectRatio = 26 / 51; // Aspect ratio for the image width 7 and height 5
      }

      if (aspect_ratio_cropper) {
        let aspectRatioCropper = eval(aspect_ratio_cropper);

        if (["67989143599", "73033842885"].includes(window.ap_front_settings.shop_id)) { 
          aspectRatio = aspectRatioCropper; // Aspect ratio for the image custom
        }
      }

      cropper = new Cropper(document.getElementById(`${id}-image`), {
        viewMode: 3, // The canvas will always fit the container
        dragMode: "move",
        aspectRatio: aspectRatio,
        autoCropArea: 0, // The crop box automatically sizes to fill the available area
        restore: false,
        background: false,
        guides: true,
        center: true,
        highlight: false,
        cropBoxMovable: true,
        cropBoxResizable: true,
        toggleDragModeOnDblclick: false,
      });
    }

    const listKeyButtonAddCart = [
      'button[id*="AddToCart"]',
      'button[id*="add-to-cart"]',
      'button[id*="addToCart"]',
      'a[id*="AddToCart"]',
      'a[id*="addToCart"]',
      ".product__add-to-cart-button",
      ".product-submit",
      ".product-form--atc-button",
      ".product-form__cart-submit",
      ".product-buy-buttons--cta",
      ".btn--add-to-cart",
      ".button-cart",
      "button.add-to-cart-btn",
      ".add-to-cart-button",
      "button--addToCart",
      "[data-product-add]",
      'button[data-pf-type*="ProductATC"]',
      "[name=add]:not([type=normal])",
      "[type=submit]:not(.spr-button):not(.apo-exclude)",
      ".lh-buy-now",
      ".qview-btn-addtocart",
      ".ajax-submit.action_button.add_to_cart",
      ".action_button.add_to_cart",
      ".atc-btn-container .add_to_cart",
      ".add_to_cart",
      ".button.ajax-submit.action_button",
      ".action_button.add_to_cart",
      ".action_button.add_to_cart",
      ".btn-addtocart",
      ".product-form__submit",
      ".product-form__add-button",
      ".product-form--add-to-cart",
      ".btn--subtle-hover",
      "#product-add-to-cart",
      "#AddToCart",
      ".button--large",
      ".AddtoCart",
    ];

    let handleDisabledBtnAddToCart = () => {
      for (let elem of listKeyButtonAddCart) {
        if (document.querySelector(elem)) {
          document.querySelector(elem).setAttribute("disabled", "");
          break;
        } else {
          console.log("APO Not Found Key Button Add To Cart");
        }
      }

      let buttonSaveChange = document.querySelector(".avis-popupFooter-submit");
      if (buttonSaveChange) {
        buttonSaveChange.setAttribute("disabled", true);
      }

      // Disabled button input upload file
      apoFileInput.setAttribute("disabled", true);
    };
    let handleUndisabledBtnAddToCart = () => {
      for (let elem of listKeyButtonAddCart) {
        if (document.querySelector(elem)) {
          document.querySelector(elem)?.removeAttribute("disabled");
          break;
        }
      }

      let buttonSaveChange = document.querySelector(".avis-popupFooter-submit");
      if (buttonSaveChange) {
        buttonSaveChange?.removeAttribute("disabled");
      }

      // Undisabled button input upload file
      apoFileInput?.removeAttribute("disabled");
    };

    if (urlDefault) {
      const html = `<div class="apo-file__img">
              <div class="apo-loader"></div>
              <div class="apo-items__preview" id="${id}-${
        isMultiFiles ? "multiple" : "single"
      }-upload-preview" hidden">
              </div>
              </div>`;
      apoFileInput.insertAdjacentHTML("afterend", html);
      isOnEditOption = true;

      if (isMultiFiles) {
        const listFileUrl = urlDefault.split(",");
        // Show image in edit option
        listFileUrl.forEach((url, index) => {
          selectedFiles.push({
            name: getFileName(url),
            url: url ? new URL(url).href : "",
            className: `${optionNameInput}-${index + 1}`,
          });
        });

        handleMultiFile(selectedFiles);
      } else {
        const fileInfo = {
          name: getFileName(urlDefault),
          url: urlDefault ? new URL(urlDefault).href : "",
        };

        handleSingleFile(fileInfo);
      }
    }

    apoFileInput.addEventListener("change", function () {
      if (!apoFileInput.files.length) {
        // Reset input value
        apoFileInput.value = "";
        return;
      }
      let apoFileSize = 0 + selectedFiles.reduce((a, b) => a + b.size, 0);
      const allowedFiles = [];
      const invalidFiles = [];
      let isHandleUseFile = false;
      let newFileTypeCusotm;
      let newTextInvalidCustom;
      const apoFileMb = apoFileSize / (1024 * 10 * 1024);
      const maxFileSize = (max_file_size * 1000000) / (1024 * 10 * 1024);
      const maxFiles = max_file_upload;
      const remainingSlots = maxFiles - selectedFiles.length;

      let minFileSize = parseFloat(min_file_size);
      let textRequiredMinSize = `Please upload file size from ${minFileSize}MB`;
      if (minFileSize > 0) {
        minFileSize = (minFileSize * 1000000) / (1024 * 10 * 1024);
      } else if (window.ap_front_settings.shop_id === "92159181184") {
        minFileSize =
          (window?.apo_min_file_size_upload * 1000000) / (1024 * 10 * 1024);
        textRequiredMinSize = window?.apo_text_required_min_file_size;
      }

      if (remainingSlots <= 0) {
        let message = `You have uploaded the maximum of ${maxFiles} files.`;
        window.AP_POptions.apps.productoptions.createMessageAlert(
          apoFileInput,
          message
        );
        apoFileInput.value = "";
        handleUndisabledBtnAddToCart();
        isHandleUseFile = false;
        return false;
      }

      if (option_file_type_custom?.length) {
        newFileTypeCusotm = new RegExp(
          `\\.(${option_file_type_custom.join("|")})$`,
          "i"
        );

        newTextInvalidCustom = option_file_type_custom
          .map((ext) => `.${ext}`)
          .join("/ ");
      }

      let apoAllowedExtensions = "";
      let textInvalid = "";
      switch (option_file_type) {
        case "image":
          apoAllowedExtensions = /(\.heic|\.jpg|\.jpeg|\.png|\.gif|\.webp|\.tif|\.tiff|\.ico|\.svg|\.stl)$/i
          textInvalid = ".jpeg/.jpg/.png/.gif/.webp/.tif/.tiff/.ico";
          break;
        case "document":
          apoAllowedExtensions = /(\.csv|\.doc|\.docx|\.doc|\.html|\.pdf|\.xls|\.xlms|\.xlsx|\.txt)$/i
          textInvalid = ".csv/.docx/.pdf/.xls/.xlms/.xlsx/.txt/.svg/.ai/.eps/.psd";
          break;

        case "custom":
          apoAllowedExtensions = newFileTypeCusotm;
          textInvalid = newTextInvalidCustom;
          break;

        default:
          apoAllowedExtensions = /(\.heic|\.jpg|\.jpeg|\.png|\.gif|\.webp|\.tif|\.tiff|\.ico|\.csv|\.docx|\.doc|\.pdf|\.xls|\.xlms|\.xlsx|\.txt|\.svg|\.ai|\.eps|\.psd|\.mp4|\.mp3|\.raw|\.stl|\.dxf|\.cdr)$/i;
          textInvalid = ".jpeg/.jpg/.png/.gif/.webp/.tif/.tiff/.ico/.csv/.docx/.pdf/.xls/.xlms/.xlsx/.txt/.svg/.ai/.eps/.psd/.mp4/.mp3/.raw/.stl/.dxf/.cdr";
          break;
      }

      let isAllowedCropForSingleImageFile = "";


      if ( window.ap_front_settings.shop_id === "89587613961" ) {
        // For shop on the list, allow cropping for specific image types
        isAllowedCropForSingleImageFile =  /(\.heic|\.jpg|\.jpeg|\.png|\.webp|\.ico)$/i;
      } else {
        isAllowedCropForSingleImageFile = /(\.heic|\.jpg|\.jpeg|\.png|\.webp|\.ico|\.svg)$/i;
      }

        // Check if the file is a single image file and if cropping is enabled
      const isCropSingleImageFile =
        isAllowedCropForSingleImageFile?.exec(apoFileInput.files[0].name) && isCropper
          ? true
          : false;

      let fileSizeItems = [];
      for (let i = 0; i < apoFileInput.files.length; i++) {
        const file = apoFileInput.files[i];
        const fileSize = file.size; // in bytes
        const fileName = file.name; // Getting file name
        // const fileExtension = fileName.split('.').pop().toLowerCase(); // Getting file extension

        if (apoAllowedExtensions?.test(fileName)) {
          apoFileSize += fileSize;
          allowedFiles.push(fileName);
        } else {
          invalidFiles.push(fileName);
        }
        fileSizeItems.push(file.size);
      }

      handleDisabledBtnAddToCart();

      const lengthCurrentFiles =
        document.querySelectorAll(
          ".apo-file__img .apo-items__preview .apo-card__loader"
        )?.length ?? 0;

      for (let fileSizeItem of fileSizeItems) {
        const maxFileSizeItem = fileSizeItem / (1024 * 10 * 1024);
        if (fileSizeItem / (1024 * 10 * 1024) < minFileSize) {
          window.AP_POptions.apps.productoptions.createMessageAlert(
            apoFileInput,
            textRequiredMinSize
          );
          apoFileInput.value = "";
          handleUndisabledBtnAddToCart();
          isHandleUseFile = false;
          return false;
        } else if (
          appPlan === "PREMIUM" &&
          window.ap_front_settings.shop_id === "92159181184" &&
          fileSizeItem / (1024 * 10 * 1024) < minFileSize
        ) {
          window.AP_POptions.apps.productoptions.createMessageAlert(
            apoFileInput,
            textRequiredMinSize
          );
          apoFileInput.value = "";
          handleUndisabledBtnAddToCart();
          isHandleUseFile = false;
          return false;
        }
        if (isNewValidateShop) {
          if (invalidFiles.length > 0) {
            const messageData =
              window.ap_front_settings.config.config_app
                .text_alert_validate_file;
            const validateMessage = messageData
              ? messageData
              : window.AP_POptions.apps.productoptions.strings.errorMessages
                  .forTextValidateFileExtensions;

            let message = validateMessage.replace(
              "{file_extensions}",
              textInvalid
            );

            window.AP_POptions.apps.productoptions.createMessageAlert(
              apoFileInput,
              message
            );
            apoFileInput.value = "";
            handleUndisabledBtnAddToCart();
            isHandleUseFile = false;
            return false;
          } else if (
            (maxFileSizeItem > maxFileSize || apoFileMb > 2) &&
            (["OLD", "FREE", "BASIC", "PRO"].includes(appPlan) ||
              !appPlan)
          ) {
            let message = `Please upload file size less than ${
              max_file_size >= 20 || apoFileMb > 2 ? 20 : max_file_size
            }MB.`;
            window.AP_POptions.apps.productoptions.createMessageAlert(
              apoFileInput,
              message
            );
            apoFileInput.value = "";
            handleUndisabledBtnAddToCart();
            isHandleUseFile = false;
            return false;
          } else if (
            (maxFileSizeItem > maxFileSize || apoFileMb > 5) &&
            (appPlan === "ADVANCED" || appPlan === "PLATINUM")
          ) {
            let message = `Please upload file size less than ${
              max_file_size >= 50 || apoFileMb > 5 ? 50 : max_file_size
            }MB.`;
            window.AP_POptions.apps.productoptions.createMessageAlert(
              apoFileInput,
              message
            );
            apoFileInput.value = "";
            handleUndisabledBtnAddToCart();
            isHandleUseFile = false;
            return false;
          } else if (
            (maxFileSizeItem > maxFileSize || apoFileMb > 10) &&
            appPlan === "PREMIUM"
          ) {
            let message = `Please upload file size less than ${
              max_file_size >= 100 || apoFileMb > 10 ? 100 : max_file_size
            }MB.`;
            window.AP_POptions.apps.productoptions.createMessageAlert(
              apoFileInput,
              message
            );
            apoFileInput.value = "";
            handleUndisabledBtnAddToCart();
            isHandleUseFile = false;
            return false;
          } else if (isMultiFiles && apoFileInput.files.length > maxFiles) {
            let message = `Please upload below ${maxFiles} file.`;
            window.AP_POptions.apps.productoptions.createMessageAlert(
              apoFileInput,
              message
            );
            apoFileInput.value = "";
            handleUndisabledBtnAddToCart();
            isHandleUseFile = false;
            return false;
          } else {
            isHandleUseFile = true;
          }
        } else {
          if (invalidFiles.length > 0) {
            const messageData =
              window.ap_front_settings.config.config_app
                .text_alert_validate_file;
            const validateMessage = messageData
              ? messageData
              : window.AP_POptions.apps.productoptions.strings.errorMessages
                  .forTextValidateFileExtensions;

            const messageAlert = validateMessage.replace(
              "{file_extensions}",
              textInvalid
            );
            alert(messageAlert);

            apoFileInput.value = "";
            handleUndisabledBtnAddToCart();
            isHandleUseFile = false;
            return false;
          } else if (
            (maxFileSizeItem > maxFileSize || apoFileMb > 2) &&
            (["OLD", "FREE", "BASIC", "PRO"].includes(appPlan) ||
              !appPlan)
          ) {
            alert(
              `Please upload file size less than ${
                max_file_size >= 20 || apoFileMb > 2 ? 20 : max_file_size
              }MB.`
            );
            apoFileInput.value = "";
            handleUndisabledBtnAddToCart();
            isHandleUseFile = false;
            return false;
          } else if (
            (maxFileSizeItem > maxFileSize || apoFileMb > 5) &&
            (appPlan === "ADVANCED" || appPlan === "PLATINUM")
          ) {
            alert(
              `Please upload file size less than ${
                max_file_size >= 50 || apoFileMb > 5 ? 50 : max_file_size
              }MB.`
            );
            apoFileInput.value = "";
            handleUndisabledBtnAddToCart();
            isHandleUseFile = false;
            return false;
          } else if (
            (maxFileSizeItem > maxFileSize || apoFileMb > 10) &&
            appPlan === "PREMIUM"
          ) {
            alert(
              `Please upload file size less than ${
                max_file_size >= 100 || apoFileMb > 10 ? 100 : max_file_size
              }MB.`
            );
            apoFileInput.value = "";
            handleUndisabledBtnAddToCart();
            isHandleUseFile = false;
            return false;
          } else if (isMultiFiles && apoFileInput.files.length > maxFiles) {
            alert(`Please upload below ${maxFiles} file.`);
            apoFileInput.value = "";
            handleUndisabledBtnAddToCart();
            isHandleUseFile = false;
            return false;
          } else {
            isHandleUseFile = true;
          }
        }
      }

      if (
        isHandleUseFile === true &&
        apoFileInput.files &&
        apoFileInput.files.length &&
        isMultiFiles
      ) {
        const isImg = document.querySelector(`${elem} + .apo-file__img`);
        if (isImg) isImg.remove();
        let html = `<div class="apo-file__img">
                    <div class="apo-loader"></div>
                    <div class="apo-items__preview" id="${id}-multiple-upload-preview" hidden">

                    </div>

                    </div>`;
        apoFileInput.insertAdjacentHTML("afterend", html);

        if (remainingSlots <= 0) {
          let message = `You have uploaded the maximum of ${maxFiles} files.`;
          window.AP_POptions.apps.productoptions.createMessageAlert(
            apoFileInput,
            message
          );
          return;
        }

        if (apoFileInput.files.length > remainingSlots) {
          let message = `You can only add up to ${remainingSlots} more files.`;
          window.AP_POptions.apps.productoptions.createMessageAlert(
            apoFileInput,
            message
          );
        }

        const files = Array.from(apoFileInput.files);
        
        apoFileInput.setAttribute("length-files", files.length)

        const filesToUpload = files.slice(0, remainingSlots);

        for (const file of filesToUpload) {
          uploadFile(file);
        }

        async function uploadFile(file) {
          const param = new FormData();
          param.append("files", file);

          try {
            const response = await fetch(
              "https://apo-api.avisplus.io/api/sf/upload-file?shop_id=" +
                window.ap_front_settings.shop_id,
              {
                method: "POST",
                mode: "cors",
                body: param,
              }
            );

            const data = await response.json();
            if (data) {
              selectedFiles.push(data);
              if (!isShopUploadCdnSpf) apoFileInput.value = "";
              handleMultiFile(selectedFiles);
              return true;
            }
          } catch (error) {
            console.error("Error uploading file:", error);
          } finally {
            handleUndisabledBtnAddToCart();
          }
          return false;
        }
      } else if (
        apoFileInput.files &&
        apoFileInput.files[0] &&
        isCropSingleImageFile
      ) {
        let textSave = "";
        let textCancel = "";
        let textCrop = "";
        var configApp = window.ap_front_settings.config.config_app;
        if (window.ap_front_settings.shop_id === "48947986582") {
          textSave = "Guardar cambios";
          textCancel = "Cancelar";
          textCrop = "Recortar la imagen";
        }
        if (window.ap_front_settings.shop_id === "81289576776") {
          textSave = "Speichern";
          textCancel = "Abbrechen";
          textCrop = "Bild zuschneiden";
        } else {
          textSave = configApp.file_save_button ? configApp.file_save_button : "Save changes";
          textCancel = configApp.file_cancel_button ? configApp.file_cancel_button : "Cancel";
          textCrop = configApp.crop_your_image ? configApp.crop_your_image : "Crop your images";
        }
        const cropFileModal = document.createElement("div");
        cropFileModal.id = `${id}-apo-crop-modal`;
        cropFileModal.className = `${id} apo-custom-crop-modal`;
        cropFileModal.innerHTML = `
                      <div class="apo-crop-modal-dialog">
                        <div class="apo-crop-modal-content">
                          <div class="apo-crop-modal-header">
                            <p class="apo-crop-modal-title">${textCrop}</p>
                            <button type="button" class="apo-crop-modal-close" data-dismiss="modal" aria-label="Close">&times;</button>
                          </div>
                          <div class="apo-crop-modal-body">
                            <img id="${id}-image" src="">
                          </div>
                          <div class="apo-crop-modal-footer">
                            <div class="apo-modal-footer-group left">
                              <button type="button" class="apo-btn-zoom" id="apo-zoom-out-button"><svg class="svg-zoom" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                                  <path d="M289.8 199.7H150.4c-11.3 0-20.4 9.1-20.4 20.4 0 11.3 9.1 20.4 20.4 20.4h139.4c11.3 0 20.4-9.1 20.4-20.4 0-11.3-9.2-20.4-20.4-20.4z"></path>
                                  <path d="M220.2 388.2C127.3 388.2 52 313 52 220.1 52 127.3 127.3 52 220.2 52c92.9 0 168.1 75.3 168.1 168.1 0 92.9-75.3 168.1-168.1 168.1zM495 466.1 381.7 352.9c29.7-36.1 47.6-82.4 47.6-132.8C429.3 104.6 335.7 11 220.2 11S11 104.6 11 220.1s93.6 209.1 209.2 209.1c50.4 0 96.6-17.8 132.7-47.5L466.1 495c8 8 20.9 8 28.9 0s8-20.9 0-28.9z"></path>
                                </svg></button>

                              <button type="button" class="apo-btn-zoom" id="apo-zoom-in-button"><svg class="svg-zoom" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                                  <path d="M289.8 200.2h-49.3v-49.3c0-11.3-9.1-20.4-20.4-20.4-11.3 0-20.4 9.1-20.4 20.4v49.3h-49.3c-11.3 0-20.4 9.1-20.4 20.4 0 11.3 9.1 20.4 20.4 20.4h49.3v49.3c0 11.3 9.1 20.4 20.4 20.4 11.3 0 20.4-9.1 20.4-20.4V241h49.3c11.3 0 20.4-9.1 20.4-20.4 0-11.3-9.2-20.4-20.4-20.4z"></path>
                                  <path d="M220.2 388.7C127.3 388.7 52 313.5 52 220.6S127.3 52.5 220.2 52.5s168.1 75.3 168.1 168.1S313 388.7 220.2 388.7zm274.8 78L381.7 353.4c29.7-36.1 47.6-82.4 47.6-132.8 0-115.5-93.6-209.2-209.2-209.2S11 105.1 11 220.6s93.6 209.2 209.2 209.2c50.4 0 96.6-17.8 132.7-47.5l113.3 113.3c5.2 5.3 21.1 7.9 28.9 0 7.9-8 7.9-20.9-.1-28.9z"></path>
                                </svg></button>
                            </div>

                            <div class="apo-modal-footer-group right">
                              <button type="button" class="apo-btn-style cancel" id="apo-crop-modal-cancel">${textCancel}</button>
                              <button type="button" class="apo-btn-style submit" id="apo-crop-button">${textSave}</button>
                            </div>
                          </div>
                        </div>
                      </div>`;

        document.body.insertBefore(cropFileModal, document.body.firstChild);

        let param = new FormData();
        for (let i = 0; i < apoFileInput.files.length; i++) {
          param.append("files", apoFileInput.files[i]);
        }

        const reader = new FileReader();
        reader.onload = function (e) {
          document.getElementById(`${id}-image`).src = e.target.result;
          if (cropper) {
            cropper.destroy();
          }

          let aspectRatio = NaN;
          if (window.ap_front_settings.shop_id === "92159181184") {
            aspectRatio = 26 / 51; // Aspect ratio for the image width 130 and height 255
          }

          if (aspect_ratio_cropper) {
            let aspectRatioCropper = eval(aspect_ratio_cropper);

            if (["67989143599", "73033842885"].includes(window.ap_front_settings.shop_id)) { 
              aspectRatio = aspectRatioCropper; // Aspect ratio for the image custom
            }
          }

          cropper = new Cropper(document.getElementById(`${id}-image`), {
            viewMode: 3, // The canvas will always fit the container
            dragMode: "move",
            aspectRatio: aspectRatio,
            autoCropArea: 0, // The crop box automatically sizes to fill the available area
            restore: false,
            background: false,
            guides: true,
            center: true,
            highlight: false,
            cropBoxMovable: true,
            cropBoxResizable: true,
            toggleDragModeOnDblclick: false,
          });
        };
        reader.readAsDataURL(apoFileInput.files[0]);
        document.querySelector(`.${id}.apo-custom-crop-modal`).style.display =
          "flex";

        document
          .getElementById("apo-zoom-in-button")
          .addEventListener("click", handleZoomIn);

        document
          .getElementById("apo-zoom-out-button")
          .addEventListener("click", handleZoomOut);

        document
          .querySelector(".apo-crop-modal-close")
          .addEventListener("click", handleCancelModal);

        document
          .getElementById("apo-crop-modal-cancel")
          .addEventListener("click", handleCancelModal);

        document
          .getElementById("apo-crop-button")
          .addEventListener("click", function () {
            handleCropImage(apoFileInput.files[0]);
          });
      } else if (apoFileInput.files && apoFileInput.files[0]) {
        var isImg = document.querySelector(`${elem} + .apo-file__img`);
        if (isImg) isImg.remove();

        let html = `
                    <div class="apo-file__img">
                      <div class="apo-loader"></div>
                      <div class="apo-items__preview" id="${id}-single-upload-preview" hidden"></div>
                    </div>`;
        apoFileInput.insertAdjacentHTML("afterend", html);

        let param = new FormData();
        for (let i = 0; i < apoFileInput.files.length; i++) {
          param.append("files", apoFileInput.files[i]);
        }
        if (isShopUploadShopfiy && !isMultiFiles) {
          handleSingleFile(apoFileInput.files);
        } else {
          fetch(
            "https://apo-api.avisplus.io/api/sf/upload-file?shop_id=" +
              window.ap_front_settings.shop_id,
            {
              method: "POST",
              mode: "cors",
              body: param,
            }
          )
            .then((e) => e.json())
            .then((t) => {
              // Reset input value
              if (!isShopUploadCdnSpf) apoFileInput.value = "";
              handleSingleFile(t);
            })
            .finally(() => {
              handleUndisabledBtnAddToCart();
              return false;
            });
        }
      }
    });
  }
  window.ap_front_settings.file = file;
  return file;
}

handleFile();


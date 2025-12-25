document.addEventListener("DOMContentLoaded", () => {
  const banner = document.querySelector(".banner");
  if (!banner) return;

  const slides = banner.querySelectorAll(".banner-slide");
  const dotsContainer = banner.querySelector(".banner-dots");
  const prevButton = banner.querySelector(".banner-nav.left");
  const nextButton = banner.querySelector(".banner-nav.right");

  if (!slides.length) return;

  let currentIndex = 0;
  let autoSlideTimer = null;
  const interval = 5000;
  let dots = [];

  // 创建小圆点
  function createDots() {
    if (!dotsContainer) return;

    dotsContainer.innerHTML = "";
    dots = [];

    slides.forEach((_, index) => {
      const dot = document.createElement("button");
      dot.className = "banner-dot";
      dot.setAttribute("aria-label", `切换到第 ${index + 1} 张图片`);
      dot.setAttribute("type", "button");
      dot.setAttribute("tabindex", "0");

      if (index === 0) {
        dot.classList.add("active");
        dot.setAttribute("aria-current", "true");
      }

      dot.addEventListener("click", () => {
        goToSlide(index);
        resetAutoSlide();
      });

      // 添加键盘支持
      dot.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          goToSlide(index);
          resetAutoSlide();
        }
      });

      dotsContainer.appendChild(dot);
      dots.push(dot);
    });
  }

  // 更新幻灯片和小圆点状态
  function updateSlides() {
    slides.forEach((slide, index) => {
      if (index === currentIndex) {
        slide.classList.add("active");
        slide.style.zIndex = "2";
      } else {
        slide.classList.remove("active");
        slide.style.zIndex = "1";
      }
    });

    dots.forEach((dot, index) => {
      if (index === currentIndex) {
        dot.classList.add("active");
        dot.setAttribute("aria-current", "true");
      } else {
        dot.classList.remove("active");
        dot.removeAttribute("aria-current");
      }
    });
  }

  // 切换到指定索引的幻灯片
  function goToSlide(index) {
    if (index < 0 || index >= slides.length) return;
    currentIndex = index;
    updateSlides();
  }

  // 下一张
  function nextSlide() {
    const nextIndex = (currentIndex + 1) % slides.length;
    goToSlide(nextIndex);
  }

  // 上一张
  function prevSlide() {
    const prevIndex = (currentIndex - 1 + slides.length) % slides.length;
    goToSlide(prevIndex);
  }

  // 自动轮播
  function startAutoSlide() {
    clearInterval(autoSlideTimer);
    autoSlideTimer = setInterval(nextSlide, interval);
  }

  // 重置自动轮播
  function resetAutoSlide() {
    clearInterval(autoSlideTimer);
    startAutoSlide();
  }

  // 添加键盘导航
  function handleKeyDown(e) {
    switch(e.key) {
      case 'ArrowLeft':
        e.preventDefault();
        prevSlide();
        resetAutoSlide();
        break;
      case 'ArrowRight':
        e.preventDefault();
        nextSlide();
        resetAutoSlide();
        break;
      case 'Home':
        e.preventDefault();
        goToSlide(0);
        resetAutoSlide();
        break;
      case 'End':
        e.preventDefault();
        goToSlide(slides.length - 1);
        resetAutoSlide();
        break;
    }
  }

  // 初始化
  function initBanner() {
    // 创建圆点指示器
    createDots();

    // 添加点击事件到导航箭头
    if (prevButton) {
      prevButton.addEventListener("click", (e) => {
        e.stopPropagation();
        prevSlide();
        resetAutoSlide();
      });

      // 键盘支持
      prevButton.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          prevSlide();
          resetAutoSlide();
        }
      });
    }

    if (nextButton) {
      nextButton.addEventListener("click", (e) => {
        e.stopPropagation();
        nextSlide();
        resetAutoSlide();
      });

      // 键盘支持
      nextButton.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          nextSlide();
          resetAutoSlide();
        }
      });
    }

    // 添加键盘导航监听
    banner.addEventListener("keydown", handleKeyDown);

    // 开始自动轮播
    startAutoSlide();

    // 鼠标悬停时暂停自动轮播
    banner.addEventListener("mouseenter", () => {
      clearInterval(autoSlideTimer);
    });

    banner.addEventListener("mouseleave", () => {
      startAutoSlide();
    });

    // 触摸屏支持
    let touchStartX = 0;
    let touchEndX = 0;

    banner.addEventListener("touchstart", (e) => {
      touchStartX = e.changedTouches[0].screenX;
    });

    banner.addEventListener("touchend", (e) => {
      touchEndX = e.changedTouches[0].screenX;
      handleSwipe();
    });

    function handleSwipe() {
      const swipeThreshold = 50;
      const diff = touchStartX - touchEndX;

      if (Math.abs(diff) > swipeThreshold) {
        if (diff > 0) {
          // 向左滑动，下一张
          nextSlide();
        } else {
          // 向右滑动，上一张
          prevSlide();
        }
        resetAutoSlide();
      }
    }
  }

  // 设置无障碍属性
  function setAriaAttributes() {
    banner.setAttribute("role", "region");
    banner.setAttribute("aria-label", "图片轮播");

    slides.forEach((slide, index) => {
      slide.setAttribute("role", "tabpanel");
      slide.setAttribute("aria-roledescription", "slide");
      slide.setAttribute("aria-label", `${index + 1} of ${slides.length}`);

      if (index !== 0) {
        slide.setAttribute("aria-hidden", "true");
      }
    });
  }

  // 初始化轮播
  setAriaAttributes();
  initBanner();
});
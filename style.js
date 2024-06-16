$(document).ready(function() {
    // 平滑滚动页面
    $('.sidebar a, a[href*="#"]:not([href="#"])').on('click', function(e) {
        if (
            location.pathname.replace(/^\//, "") == this.pathname.replace(/^\//, "") &&
            location.hostname == this.hostname
        ) {
            e.preventDefault();
            const target = $(this.hash);
            if (target.length) {
                $('html, body').animate({
                    scrollTop: target.offset().top - 70
                }, 1000);
            }
        }
    });

    // 显示或隐藏回到顶部按钮
    $(window).scroll(function() {
        $('#backToTop').toggle($(this).scrollTop() > 100);
    });

    // 点击回到顶部按钮
    $('#backToTop').on('click', function() {
        $('html, body').animate({ scrollTop: 0 }, 800);
        return false;
    });

    // 处理模态框关闭时暂停视频
    $('#portfolioModal1').on('hide.bs.modal', function() {
        const video = $(this).find('video')[0];
        if (video) {
            video.pause();
        }
    });
    
    // 处理侧边栏索引滚动和高亮显示
    handleSectionObserver();
    function handleSectionObserver() {
        const sections = document.querySelectorAll("section");
        const navLinks = document.querySelectorAll(".sidebar ul li a");

        const options = {
            root: null,
            rootMargin: "0px",
            threshold: 0.7
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    navLinks.forEach(link => {
                        link.classList.toggle("active", link.getAttribute("href").substring(1) === entry.target.id);
                    });
                }
            });
        }, options);

        sections.forEach(section => {
            observer.observe(section);
        });
    }

    // 主题切换功能
    $('#themeToggle').on('click', function() {
        $('body').toggleClass('dark-mode');
    });

    // 显示当前日期
    const dateSpan = $('#date');
    const now = new Date();
    dateSpan.text(now.toLocaleDateString("zh-CN", {
        year: "numeric",
        month: "long",
        day: "numeric",
        weekday: "long"
    }));
});


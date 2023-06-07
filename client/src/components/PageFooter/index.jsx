import React from 'react';

function PageFooter(props) {
    return (
            <>
                <p className="links">
                    <span className="linkItem">友情链接：</span>
                    <a
                        href="https://www.bilibili.com/video/BV1wy4y1D7JT/?spm_id_from=333.337.search-card.all.click&vd_source=2ab3edcd06aec2b87a050ed8025235d6"
                        target="_blank"
                        rel="noreferrer"
                        className="linkItem"
                    >
                        哔哩哔哩-react
                    </a>
                    <a
                        href="http://xiaotan-kbs.gitee.io/blog/"
                        target="_blank"
                        rel="noreferrer"
                        className="linkItem"
                    >
                        我的博客
                    </a>
                    <a
                        href="http://yanhongzhi.com/"
                        target="_blank"
                        rel="noreferrer"
                        className="linkItem"
                    >
                        Mr.Yan
                    </a>
                    {/* <a
                        href="https://blog.csdn.net/jackfrued"
                        target="_blank"
                        rel="noreferrer"
                        className="linkItem"
                    >
                        骆昊的技术专栏
                    </a> */}
                </p>
                <p>© 2023 - Coder Station</p>
                <p>Powered by Create React App</p>
            </>
        );
    }

export default PageFooter;
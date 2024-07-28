// ==UserScript==
// @name         Bibtex复制
// @namespace    CaNoe
// @version      0.1
// @description  直接复制bibtex到剪贴板
// @author       CaNoe
// @match        https://scholar.google.com/scholar*
// @match        https://scholar.google.com.hk/scholar*
// @require      https://unpkg.com/jquery@3.7.1/dist/jquery.js
// @connect      scholar.googleusercontent.com
// @grant        GM_setClipboard
// @grant        GM_xmlhttpRequest
// @run-at       document-end
// @license MIT
// @downloadURL  https://update.greasyfork.org/scripts/442869/%E8%B0%B7%E6%AD%8C%E5%AD%A6%E6%9C%AF%E7%9B%B4%E6%8E%A5%E5%A4%8D%E5%88%B6bibtex.user.js
// @updateURL    https://update.greasyfork.org/scripts/442869/%E8%B0%B7%E6%AD%8C%E5%AD%A6%E6%9C%AF%E7%9B%B4%E6%8E%A5%E5%A4%8D%E5%88%B6bibtex.meta.js
// ==/UserScript==

/* global $ */

(function() {
    'use strict';
    var ALERT = true;

    function showNotification(message) {
        var notification = document.createElement('div');
        notification.style.position = 'fixed';
        notification.style.bottom = '10px';
        notification.style.right = '10px';
        notification.style.backgroundColor = '#444';
        notification.style.color = '#fff';
        notification.style.padding = '10px';
        notification.style.borderRadius = '5px';
        notification.style.boxShadow = '0 0 10px rgba(0, 0, 0, 0.5)';
        notification.innerText = message;

        document.body.appendChild(notification);

        setTimeout(function() {
            document.body.removeChild(notification);
        }, 3000);
    }

    $('a.gs_nta.gs_nph').each(function() {
        if (this.classList.length == 2) {
            var that = this;
            this.onclick = function() {
                GM_xmlhttpRequest({
                    url: that.href,
                    onload: ({
                        responseText
                    }) => {
                        GM_setClipboard(responseText);
                        if (ALERT) {
                            showNotification('复制成功');
                        }
                    }
                });
                return false;
            }
        }
    });
})();

const scenarios = {
    1: {
        title: "Lần đầu sử dụng tính năng AI (P0)",
        rationale: `
            <span class="rationale-tag tag-ask">ASK</span>
            <strong>Bối cảnh:</strong> Sinh viên lần đầu dùng trợ lý AI.<br><br>
            <strong>AI chưa biết:</strong> Ngành học, niên khóa, mã số SV.<br><br>
            <strong>Lý do thiết kế:</strong> Thiết lập kỳ vọng đúng đắn ngay từ đầu. Không làm form dài. Thay vào đó, AI yêu cầu cấp quyền truy cập mã SV để tự động lấy dữ liệu nội bộ một cách an toàn.
        `,
        init: () => {
            clearChat();
            addMessage("ai", `
                Xin chào! Tôi là AI Trợ Lý Học Vụ. Tôi có thể giúp bạn:
                <ul class="permission-list" style="margin-top: 8px;">
                    <li><i class='bx bx-check'></i> Tra cứu điểm, lịch thi, học phí</li>
                    <li><i class='bx bx-check'></i> Giải đáp quy chế đào tạo</li>
                    <li><i class='bx bx-x' style="color: red;"></i> Không tự ý sửa điểm hoặc tự phê duyệt đơn từ</li>
                </ul>
                Để tư vấn chính xác theo ngành học của bạn, tôi cần quyền truy cập thông tin Mã Số Sinh Viên của bạn.
            `);
            addUI(`
                <div class="ui-card">
                    <h4>Cấp quyền truy cập hệ thống</h4>
                    <button class="btn btn-primary" onclick="app.handleAction('grant_access')">Cho phép truy cập Mã SV</button>
                    <button class="btn btn-outline" onclick="app.handleAction('deny_access')">Hỏi ẩn danh</button>
                </div>
            `);
        }
    },
    2: {
        title: "Yêu cầu còn mơ hồ (P1)",
        rationale: `
            <span class="rationale-tag tag-ask">ASK</span>
            <strong>Bối cảnh:</strong> Yêu cầu thiếu thông tin quan trọng.<br><br>
            <strong>AI chưa biết:</strong> Môn học nào? Học kỳ nào? Đã đóng học phí chưa?<br><br>
            <strong>Lý do thiết kế:</strong> Nếu AI đưa một bài HD dài 2 trang sẽ làm SV bị ngợp. AI cần chủ động thu hẹp phạm vi bằng cách gợi ý các môn học sinh viên đang đăng ký.
        `,
        init: () => {
            clearChat();
            addMessage("user", "Làm sao để hủy học phần?");
            showTyping();
            setTimeout(() => {
                removeTyping();
                addMessage("ai", "Bạn muốn hủy học phần của học kỳ này đúng không? Vui lòng chọn môn bạn muốn hủy để tôi kiểm tra thời hạn và điều kiện nhé:");
                addUI(`
                    <div class="chip-container">
                        <div class="chip" onclick="app.handleAction('cancel_math')">Toán cao cấp</div>
                        <div class="chip" onclick="app.handleAction('cancel_phy')">Vật lý đại cương</div>
                        <div class="chip" onclick="app.handleAction('cancel_other')">Môn khác...</div>
                    </div>
                `);
            }, 800);
        }
    },
    3: {
        title: "Hành động có tác động cao (P3)",
        rationale: `
            <span class="rationale-tag tag-act">ACT (Nháp)</span>
            <span class="rationale-tag tag-ask">ASK (Gửi)</span>
            <strong>Bối cảnh:</strong> Sinh viên nhờ AI nộp đơn phúc khảo.<br><br>
            <strong>Rủi ro:</strong> Đơn gửi đi liên quan đến lệ phí và quy trình nội bộ. AI không được tự ý gửi.<br><br>
            <strong>Lý do thiết kế:</strong> AI tự động điền đơn (Act giúp tiết kiệm thời gian), nhưng bắt buộc phải xin xác nhận từ SV (Ask) trước khi thực sự lưu vào hệ thống.
        `,
        init: () => {
            clearChat();
            addMessage("user", "Giúp mình gửi đơn phúc khảo môn Toán Cao Cấp nhé.");
            showTyping();
            setTimeout(() => {
                removeTyping();
                addMessage("ai", "Tôi đã tạo sẵn bản nháp đơn xin phúc khảo điểm môn Toán Cao Cấp cho bạn. Bạn vui lòng kiểm tra lại thông tin và xác nhận để tôi gửi lên Phòng Đào Tạo nhé.");
                addUI(`
                    <div class="ui-card" style="border-left: 4px solid var(--primary);">
                        <h4 style="color: var(--primary-dark);">📄 Đơn Xin Phúc Khảo</h4>
                        <p style="font-size: 0.8rem; margin-bottom: 4px;"><strong>SV:</strong> Trần Hoàng Đạt (2A202600807)</p>
                        <p style="font-size: 0.8rem; margin-bottom: 12px;"><strong>Môn:</strong> Toán Cao Cấp (MATH101)</p>
                        <button class="btn btn-primary" onclick="app.handleAction('submit_form')">Xác nhận gửi đơn</button>
                        <button class="btn btn-outline" onclick="app.handleAction('edit_form')">Chỉnh sửa lý do</button>
                        <div class="feedback-box">
                            <button class="feedback-btn" onclick="app.handleAction('undo')"><i class='bx bx-undo'></i> Hủy bỏ tác vụ</button>
                        </div>
                    </div>
                `);
            }, 1000);
        }
    },
    4: {
        title: "Dữ liệu chưa chắc chắn (P4)",
        rationale: `
            <span class="rationale-tag tag-act">ACT (Dự kiến)</span>
            <strong>Bối cảnh:</strong> Hỏi lịch thi nhưng Phòng ĐT chưa chốt.<br><br>
            <strong>Dữ liệu:</strong> Trạng thái lịch thi là "Dự kiến" (Thiếu bằng chứng xác thực).<br><br>
            <strong>Lý do thiết kế:</strong> Hiển thị cảnh báo trực quan để SV không mua vé máy bay/đặt lịch về quê nhầm. Cung cấp chức năng "Nhắc tôi" làm đường khôi phục khi có lịch chính thức.
        `,
        init: () => {
            clearChat();
            addMessage("user", "Bao giờ thi môn Triết vậy AI?");
            showTyping();
            setTimeout(() => {
                removeTyping();
                addMessage("ai", `
                    Theo lịch dự kiến nội bộ, môn Triết học sẽ thi vào ngày <strong>15/07/2026</strong>. 
                    <br><br>
                    <span style="color: #B91C1C; font-weight: 500;"><i class='bx bx-error-circle'></i> Lưu ý: Lịch này chưa được Phòng Đào tạo đóng dấu chính thức và có thể thay đổi.</span>
                    <div class="citation-box">
                        <i class='bx bxs-file-pdf'></i> Nguồn: <a href="#" onclick="return false;">Bản thảo Lịch thi HK2_v1.pdf</a>
                    </div>
                `);
                addUI(`
                    <button class="btn btn-outline" onclick="app.handleAction('notify_schedule')"><i class='bx bx-bell'></i> Bật thông báo khi có lịch chính thức</button>
                `);
            }, 1200);
        }
    },
    5: {
        title: "Sai sót & Khôi phục (P5/P6)",
        rationale: `
            <span class="rationale-tag tag-act">ACT (Hiểu sai)</span>
            <span class="rationale-tag tag-ask">ASK (Khôi phục)</span>
            <strong>Bối cảnh:</strong> Sinh viên hỏi "Làm sao để qua", AI hiểu lầm là xin phúc khảo.<br><br>
            <strong>Lý do thiết kế:</strong> Cung cấp Explicit User Feedback ngay trên UI thay vì chỉ nút Dislike. Khi SV click báo sai, AI tự động phục hồi luồng đúng (Recovery) và dẫn tới quy chế học lại.
        `,
        init: () => {
            clearChat();
            addMessage("user", "Mình rớt môn Kế toán, làm sao để pass đây?");
            showTyping();
            setTimeout(() => {
                removeTyping();
                addMessage("ai", "Đừng lo, nếu bạn nghĩ có sai sót trong khâu chấm điểm, bạn có thể làm đơn phúc khảo. Tôi có thể giúp bạn tạo đơn ngay bây giờ.");
                addUI(`
                    <button class="btn btn-primary" onclick="app.handleAction('create_review')">Tạo đơn phúc khảo</button>
                    <div class="feedback-box">
                        <button class="feedback-btn explicit" onclick="app.handleAction('wrong_intent')">
                            <i class='bx bx-message-alt-x'></i> Không, tôi muốn hỏi về học lại / thi lại
                        </button>
                    </div>
                `);
            }, 1000);
        }
    }
};

const app = {
    currentScenario: 1,

    loadScenario(id) {
        this.currentScenario = id;
        
        // Update nav
        document.querySelectorAll('.nav-btn').forEach(btn => btn.classList.remove('active'));
        document.querySelectorAll('.nav-btn')[id-1].classList.add('active');

        // Update Rationale
        const rationaleContent = document.getElementById('rationale-content');
        rationaleContent.innerHTML = scenarios[id].rationale;

        // Init Chat
        scenarios[id].init();
    },

    handleAction(action) {
        const inputArea = document.getElementById('chat-input-area');
        
        switch(action) {
            case 'grant_access':
                inputArea.innerHTML = '';
                addMessage("user", "Cho phép truy cập Mã SV");
                setTimeout(() => {
                    addMessage("ai", "Cảm ơn Đạt! Tôi đã kết nối thành công với hồ sơ của bạn. Bây giờ bạn có thể hỏi tôi bất kỳ điều gì về lịch học, điểm số hay quy chế.");
                    this.showToast("System Feedback (Implicit): Hệ thống tự động lưu trạng thái kết nối");
                }, 800);
                break;
            
            case 'cancel_math':
                inputArea.innerHTML = '';
                addMessage("user", "Mình muốn hủy môn Toán cao cấp");
                setTimeout(() => {
                    addMessage("ai", "Hạn chót hủy môn Toán cao cấp (không ghi nhận điểm F) là ngày 20/06. Hiện tại vẫn còn trong thời hạn. Bạn có muốn xem hướng dẫn chi tiết các bước thực hiện trên Cổng thông tin không?");
                }, 800);
                break;
            
            case 'submit_form':
                inputArea.innerHTML = '';
                addMessage("user", "Xác nhận gửi đơn");
                setTimeout(() => {
                    addMessage("ai", "✅ Đã gửi đơn phúc khảo môn Toán Cao Cấp thành công! Kết quả dự kiến sẽ có trong 3-5 ngày làm việc. Mã đơn của bạn là #REV1023.");
                }, 800);
                break;
                
            case 'notify_schedule':
                inputArea.innerHTML = '';
                addMessage("user", "Bật thông báo khi có lịch chính thức");
                setTimeout(() => {
                    addMessage("ai", "Đã bật! Tôi sẽ gửi thông báo đẩy (push notification) cho bạn ngay khi Phòng Đào tạo cập nhật lịch thi chính thức.");
                }, 800);
                break;

            case 'wrong_intent':
                inputArea.innerHTML = '';
                addMessage("user", "Không, tôi muốn hỏi về học lại / thi lại");
                setTimeout(() => {
                    addMessage("ai", "Xin lỗi vì sự hiểu nhầm. Dưới đây là quy chế học lại / thi lại môn Kế toán:<br><br>1. Nếu điểm F, bạn bắt buộc phải học lại.<br>2. Lịch đăng ký học lại dự kiến vào tháng 8. Bạn có muốn tôi nhắc nhở khi đến ngày đăng ký không?");
                    this.showToast("Recovery: AI ghi nhận lỗi và tiếp tục giúp User đạt mục tiêu");
                }, 800);
                break;
        }
    },

    showToast(message) {
        const toast = document.getElementById('toast');
        toast.textContent = message;
        toast.classList.remove('hidden');
        toast.classList.add('show');
        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => toast.classList.add('hidden'), 300);
        }, 3000);
    }
};

function clearChat() {
    document.getElementById('chat-body').innerHTML = '';
    document.getElementById('chat-input-area').innerHTML = `
        <input type="text" class="input-box" placeholder="Nhập câu hỏi của bạn...">
        <button class="send-btn"><i class='bx bx-send'></i></button>
    `;
}

function addMessage(sender, text) {
    const body = document.getElementById('chat-body');
    const msg = document.createElement('div');
    msg.className = `message ${sender}`;
    msg.innerHTML = `<div class="msg-bubble">${text}</div>`;
    body.appendChild(msg);
    body.scrollTop = body.scrollHeight;
}

function addUI(htmlStr) {
    const area = document.getElementById('chat-input-area');
    area.innerHTML = htmlStr;
}

function showTyping() {
    const body = document.getElementById('chat-body');
    const msg = document.createElement('div');
    msg.className = `message ai typing-msg`;
    msg.id = 'typing-msg';
    msg.innerHTML = `
        <div class="msg-bubble">
            <div class="typing-indicator">
                <div class="typing-dot"></div>
                <div class="typing-dot"></div>
                <div class="typing-dot"></div>
            </div>
        </div>
    `;
    body.appendChild(msg);
    body.scrollTop = body.scrollHeight;
}

function removeTyping() {
    const typing = document.getElementById('typing-msg');
    if (typing) typing.remove();
}

// Init app
window.onload = () => {
    app.loadScenario(1);
};

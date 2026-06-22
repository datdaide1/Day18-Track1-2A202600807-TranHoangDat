# Day 18 - Track 1: Human-Centered AI Design

**Học viên:** Trần Hoàng Đạt  
**Mã HV:** 2A202600807  
**Dự án:** AI Trợ Lý Hỏi Đáp Học Vụ (AI Academic Advisor)

## 📌 Liên kết Prototype

*Vui lòng chèn liên kết tới bản prototype (Figma/Framer) của bạn vào đây. Hãy đảm bảo liên kết đã được cấp quyền "Anyone with the link can view".*

[👉 **Click vào đây để xem Prototype**](#)

---

## 🎯 Cấu trúc Prototype (Bên trong liên kết)

Để thuận tiện cho việc chấm bài, file thiết kế đã được sắp xếp theo cấu trúc:
- `00` - Flow map và phạm vi tính năng
- `01` - Giai đoạn Onboarding
- `02` - Luồng chính / Trong hành động (Trong lúc AI tương tác)
- `03` - Lớp giải thích (Explainability) / Ranh giới tự chủ (Agency)
- `04` - Sai sót & Khôi phục (Failure & Recovery)
- `05` - Vòng lặp phản hồi 2 chiều (Feedback loop 2x2)
- `06` - Thẻ Design Rationale (Chú thích lý do thiết kế bên cạnh flow)
- `07` - Demo Path (Đường dẫn trải nghiệm 5 phút)

## 📝 Giới thiệu Lát cắt thiết kế (Scope)
Ngữ cảnh: Sinh viên sử dụng AI Trợ lý Học vụ để tra cứu thông tin (lịch học, lịch thi dự kiến, thủ tục phúc khảo điểm...).  
Lát cắt này tập trung thể hiện cách hệ thống phản hồi khi:
1. Yêu cầu của sinh viên không rõ ràng.
2. AI thao tác thay sinh viên (nộp đơn phúc khảo) cần xác nhận (Ask/Act/Don't Act).
3. Dữ liệu trên hệ thống chưa chính thức (không chắc chắn).
4. AI hiểu nhầm ý định của sinh viên và cách sinh viên báo lỗi để hệ thống tự điều chỉnh.

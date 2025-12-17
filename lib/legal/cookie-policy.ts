export const cookiePolicyContent = {
  title: "Chính Sách Cookie",
  subtitle: "Cách SalaryLens sử dụng cookies và công nghệ theo dõi",
  lastUpdated: "17 tháng 12, 2024",

  sections: [
    {
      id: "cookies-la-gi",
      title: "1. Cookies Là Gì?",
      content: `
Cookies là các tệp văn bản nhỏ được lưu trữ trên thiết bị của bạn (máy tính, điện thoại, máy tính bảng) khi bạn truy cập website.

### Cookies Giúp Gì?

• Ghi nhớ đăng nhập và tùy chọn của bạn
• Phân tích cách bạn sử dụng website
• Cải thiện hiệu suất và trải nghiệm
• Cung cấp nội dung được cá nhân hóa

### Loại Cookies

**First-party cookies**: Do SalaryLens đặt trực tiếp
**Third-party cookies**: Do đối tác (Google Analytics) đặt
      `.trim()
    },

    {
      id: "cookies-chung-toi-su-dung",
      title: "2. Cookies Chúng Tôi Sử Dụng",
      content: `
### 2.1. Cookies Cần Thiết (Không Thể Từ Chối)

Các cookies này cần thiết để website hoạt động:

| Cookie | Mục đích | Thời hạn |
|--------|----------|----------|
| \`session_id\` | Duy trì phiên làm việc | Session |
| \`csrf_token\` | Bảo mật chống tấn công CSRF | Session |
| \`locale\` | Ghi nhớ ngôn ngữ | 1 năm |

### 2.2. Cookies Hiệu Suất (Có Thể Từ Chối)

Giúp chúng tôi hiểu cách người dùng sử dụng website:

| Cookie | Mục đích | Thời hạn |
|--------|----------|----------|
| \`_ga\` | Google Analytics - ID người dùng | 2 năm |
| \`_gid\` | Google Analytics - ID phiên | 24 giờ |
| \`_gat\` | Google Analytics - Throttling | 1 phút |

### 2.3. Cookies Chức Năng (Có Thể Từ Chối)

Ghi nhớ tùy chọn và cài đặt:

| Cookie | Mục đích | Thời hạn |
|--------|----------|----------|
| \`theme\` | Dark/Light mode | 1 năm |
| \`calculator_history\` | Lưu lịch sử tính toán | 30 ngày |
| \`preferences\` | Cài đặt người dùng | 1 năm |

### 2.4. Cookies Quảng Cáo (Có Thể Từ Chối)

Hiển thị quảng cáo phù hợp:

| Cookie | Nhà cung cấp | Mục đích | Thời hạn |
|--------|--------------|----------|----------|
| \`_gcl_au\` | Google Ads | Đo lường chuyển đổi | 90 ngày |
| \`IDE\` | DoubleClick | Targeting quảng cáo | 1 năm |
      `.trim()
    },

    {
      id: "cong-nghe-khac",
      title: "3. Công Nghệ Theo Dõi Khác",
      content: `
Ngoài cookies, chúng tôi sử dụng:

### 3.1. Local Storage

Lưu trữ dữ liệu lớn hơn trên trình duyệt:
• Lịch sử tính toán (nếu không đăng nhập)
• Cài đặt giao diện
• Dữ liệu tạm thời

### 3.2. Web Beacons (Pixels)

Các hình ảnh nhỏ, trong suốt để:
• Theo dõi email đã mở
• Đo lường hiệu quả marketing
• Phân tích hành vi người dùng

### 3.3. Fingerprinting

Thu thập thông tin về:
• Loại trình duyệt và phiên bản
• Hệ điều hành
• Độ phân giải màn hình
• Múi giờ

**Lưu ý**: Chúng tôi chỉ sử dụng để phân tích, không để tracking cá nhân.
      `.trim()
    },

    {
      id: "quan-ly-cookies",
      title: "4. Quản Lý Cookies",
      content: `
### 4.1. Cookie Banner

Khi bạn lần đầu truy cập, bạn có thể:
• ✅ **Chấp nhận tất cả**: Cho phép mọi cookies
• ⚙️ **Tùy chỉnh**: Chọn loại cookies cụ thể
• ❌ **Từ chối**: Chỉ dùng cookies cần thiết

### 4.2. Cài Đặt Trình Duyệt

**Google Chrome**:
1. Settings → Privacy and security → Cookies
2. Chọn "Block third-party cookies"

**Firefox**:
1. Settings → Privacy & Security
2. Chọn mức độ bảo vệ

**Safari**:
1. Preferences → Privacy
2. Bật "Block all cookies"

**Edge**:
1. Settings → Privacy, search, and services
2. Quản lý cookies

### 4.3. Opt-Out Tools

• [Google Analytics Opt-out](https://tools.google.com/dlpage/gaoptout)
• [Your Online Choices](https://www.youronlinechoices.com/)
• [NAI Opt-out](https://optout.networkadvertising.org/)

### 4.4. Do Not Track (DNT)

Chúng tôi tôn trọng tín hiệu DNT từ trình duyệt của bạn.
      `.trim()
    },

    {
      id: "anh-huong-tu-choi",
      title: "5. Ảnh Hưởng Khi Từ Chối Cookies",
      content: `
Nếu bạn từ chối hoặc xóa cookies:

### ✅ Vẫn Hoạt Động

• Tính toán lương cơ bản
• Xem nội dung công khai
• Sử dụng các tính năng cốt lõi

### ⚠️ Có Thể Bị Ảnh Hưởng

• Phải đăng nhập lại mỗi lần truy cập
• Mất cài đặt cá nhân hóa (theme, ngôn ngữ)
• Không lưu lịch sử tính toán
• Trải nghiệm kém mượt mà hơn

### ❌ Không Hoạt Động

• Đăng nhập (nếu chặn cookies cần thiết)
• Một số tính năng yêu cầu cookies
      `.trim()
    },

    {
      id: "cap-nhat",
      title: "6. Cập Nhật Chính Sách",
      content: `
Chính sách này được cập nhật lần cuối: **17/12/2024**

Chúng tôi có thể thay đổi cách sử dụng cookies. Các thay đổi sẽ được cập nhật trên trang này với ngày mới.

Kiểm tra định kỳ để cập nhật thông tin mới nhất.
      `.trim()
    },

    {
      id: "lien-he",
      title: "7. Liên Hệ",
      content: `
Câu hỏi về cookies? Liên hệ:

**Email**: support@salarylens.com
**Data Protection Officer**: dpo@salarylens.com

Chúng tôi sẽ phản hồi trong vòng 7 ngày làm việc.
      `.trim()
    }
  ]
};

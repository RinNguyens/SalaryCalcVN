# 📜 SalaryLens - Legal Pages Complete Documentation

> Chính sách Bảo mật, Cookie & Điều khoản Sử dụng

**Pages:** Privacy Policy, Cookie Policy, Terms of Service  
**Language:** Tiếng Việt (Professional Legal Tone)  
**Framework:** Next.js 15 + TypeScript

---

## 📋 MỤC LỤC

1. [File Structure](#-file-structure)
2. [Privacy Policy Content](#-privacy-policy-content)
3. [Cookie Policy Content](#-cookie-policy-content)
4. [Terms of Service Content](#-terms-of-service-content)
5. [Page Components](#-page-components)
6. [Shared Components](#-shared-components)
7. [Styling & UI](#-styling--ui)
8. [Navigation](#-navigation)
9. [SEO & Metadata](#-seo--metadata)

---

## 📁 FILE STRUCTURE

```
app/
├── (legal)/
│   ├── layout.tsx                    # Legal pages layout
│   ├── privacy/
│   │   └── page.tsx                  # Privacy Policy
│   ├── cookies/
│   │   └── page.tsx                  # Cookie Policy
│   └── terms/
│       └── page.tsx                  # Terms of Service
│
components/
├── legal/
│   ├── legal-layout.tsx              # Shared legal page layout
│   ├── legal-section.tsx             # Section component
│   ├── legal-toc.tsx                 # Table of contents
│   └── legal-footer.tsx              # Legal footer
│
lib/
└── legal-content.ts                  # Content data
```

---

## 🔒 PRIVACY POLICY CONTENT

### **Full Vietnamese Content:**

```typescript
// lib/legal/privacy-policy.ts

export const privacyPolicyContent = {
  title: "Chính Sách Bảo Mật",
  subtitle: "SalaryLens cam kết bảo vệ quyền riêng tư và dữ liệu cá nhân của bạn",
  lastUpdated: "17 tháng 12, 2024",
  
  sections: [
    {
      id: "gioi-thieu",
      title: "1. Giới Thiệu",
      content: `
SalaryLens ("chúng tôi", "của chúng tôi") cam kết bảo vệ quyền riêng tư của bạn. 
Chính sách bảo mật này giải thích cách chúng tôi thu thập, sử dụng, lưu trữ và 
bảo vệ thông tin cá nhân của bạn khi bạn sử dụng website và dịch vụ của chúng tôi.

Bằng cách sử dụng SalaryLens, bạn đồng ý với các điều khoản trong chính sách này.
      `.trim()
    },
    
    {
      id: "thong-tin-thu-thap",
      title: "2. Thông Tin Chúng Tôi Thu Thập",
      content: `
### 2.1. Thông Tin Bạn Cung Cấp

Khi sử dụng dịch vụ của chúng tôi, bạn có thể cung cấp:

• **Thông tin tính lương**: Mức lương, số người phụ thuộc, các khoản khấu trừ
• **Thông tin liên hệ**: Email (nếu đăng ký tài khoản)
• **Thông tin phản hồi**: Đánh giá, góp ý về dịch vụ

### 2.2. Thông Tin Tự Động Thu Thập

Chúng tôi tự động thu thập:

• **Thông tin thiết bị**: Loại thiết bị, hệ điều hành, trình duyệt
• **Dữ liệu sử dụng**: Trang đã xem, thời gian truy cập, tính năng sử dụng
• **Dữ liệu kỹ thuật**: Địa chỉ IP, cookies, dữ liệu phiên làm việc

### 2.3. Thông Tin Từ Bên Thứ Ba

Chúng tôi có thể nhận thông tin từ:

• Dịch vụ phân tích (Google Analytics)
• Nền tảng mạng xã hội (nếu bạn đăng nhập qua mạng xã hội)
• Đối tác quảng cáo (dữ liệu ẩn danh)
      `.trim()
    },
    
    {
      id: "muc-dich-su-dung",
      title: "3. Mục Đích Sử Dụng Thông Tin",
      content: `
Chúng tôi sử dụng thông tin của bạn để:

### 3.1. Cung Cấp Dịch Vụ

• Tính toán lương gross, net, thuế TNCN chính xác
• Lưu lịch sử tính toán của bạn
• Cung cấp phân tích và insights về lương
• Hỗ trợ tính năng AI Assistant

### 3.2. Cải Thiện Dịch Vụ

• Phân tích cách người dùng sử dụng website
• Nghiên cứu xu hướng lương tại Việt Nam
• Phát triển tính năng mới dựa trên nhu cầu người dùng
• Tối ưu hóa trải nghiệm người dùng

### 3.3. Liên Lạc

• Gửi thông báo về cập nhật dịch vụ
• Phản hồi câu hỏi và hỗ trợ khách hàng
• Gửi tin tức và mẹo hữu ích về tài chính (nếu bạn đăng ký)

### 3.4. Bảo Mật và Tuân Thủ

• Phát hiện và ngăn chặn gian lận
• Tuân thủ nghĩa vụ pháp lý
• Bảo vệ quyền lợi của chúng tôi và người dùng
      `.trim()
    },
    
    {
      id: "chia-se-thong-tin",
      title: "4. Chia Sẻ Thông Tin",
      content: `
Chúng tôi **KHÔNG BÁN** thông tin cá nhân của bạn. Chúng tôi chỉ chia sẻ thông tin trong các trường hợp sau:

### 4.1. Với Sự Đồng Ý Của Bạn

Chúng tôi sẽ chia sẻ thông tin khi bạn cho phép rõ ràng.

### 4.2. Nhà Cung Cấp Dịch Vụ

Chúng tôi chia sẻ với các đối tác tin cậy để:

• **Lưu trữ dữ liệu**: Vercel, AWS (được mã hóa)
• **Phân tích**: Google Analytics (dữ liệu ẩn danh)
• **AI Assistant**: Z.AI (chỉ dữ liệu cần thiết)
• **Email**: SendGrid (nếu bạn đăng ký nhận email)

Tất cả đối tác phải tuân thủ các tiêu chuẩn bảo mật nghiêm ngặt.

### 4.3. Yêu Cầu Pháp Lý

Chúng tôi có thể tiết lộ thông tin nếu:

• Theo yêu cầu của cơ quan chức năng
• Bảo vệ quyền lợi và an toàn của người dùng
• Điều tra gian lận hoặc vi phạm
• Tuân thủ quy trình pháp lý

### 4.4. Chuyển Giao Kinh Doanh

Trong trường hợp sáp nhập, mua lại hoặc bán tài sản, thông tin người dùng có thể được chuyển giao. Chúng tôi sẽ thông báo trước nếu có thay đổi về quyền sở hữu dữ liệu.
      `.trim()
    },
    
    {
      id: "bao-mat-du-lieu",
      title: "5. Bảo Mật Dữ Liệu",
      content: `
Chúng tôi áp dụng các biện pháp bảo mật kỹ thuật và tổ chức để bảo vệ dữ liệu của bạn:

### 5.1. Mã Hóa

• **SSL/TLS**: Mọi dữ liệu truyền tải được mã hóa
• **Mã hóa dữ liệu**: Dữ liệu nhạy cảm được mã hóa khi lưu trữ

### 5.2. Kiểm Soát Truy Cập

• Chỉ nhân viên được ủy quyền mới truy cập dữ liệu
• Xác thực đa yếu tố cho hệ thống quản trị
• Giám sát và ghi log truy cập

### 5.3. Bảo Mật Hệ Thống

• Cập nhật bảo mật thường xuyên
• Kiểm tra lỗ hổng bảo mật định kỳ
• Firewall và hệ thống phát hiện xâm nhập

### 5.4. Lưu Ý Quan Trọng

Mặc dù chúng tôi nỗ lực bảo vệ dữ liệu, không có phương pháp truyền tải hoặc lưu trữ nào là 100% an toàn. Chúng tôi không thể đảm bảo tuyệt đối về bảo mật dữ liệu.
      `.trim()
    },
    
    {
      id: "quyen-cua-ban",
      title: "6. Quyền Của Bạn",
      content: `
Bạn có các quyền sau đối với dữ liệu cá nhân của mình:

### 6.1. Truy Cập và Sửa Đổi

• **Xem dữ liệu**: Yêu cầu xem thông tin chúng tôi lưu trữ về bạn
• **Cập nhật**: Sửa thông tin không chính xác
• **Tải xuống**: Nhận bản sao dữ liệu của bạn

### 6.2. Xóa Dữ Liệu

• **Xóa tài khoản**: Yêu cầu xóa hoàn toàn tài khoản
• **Xóa dữ liệu**: Xóa các dữ liệu cụ thể
• **Quyền bị lãng quên**: Yêu cầu xóa dữ liệu cá nhân (theo GDPR)

### 6.3. Kiểm Soát Tiếp Thị

• **Từ chối email**: Hủy đăng ký email bất kỳ lúc nào
• **Tùy chọn cookie**: Quản lý cookies qua trình duyệt
• **Quảng cáo**: Từ chối quảng cáo được cá nhân hóa

### 6.4. Phản Đối Xử Lý

• Phản đối xử lý dữ liệu cho mục đích tiếp thị
• Yêu cầu hạn chế xử lý dữ liệu
• Phản đối quyết định tự động

### 6.5. Cách Thực Hiện Quyền

Liên hệ: support@salarylens.com  
Thời gian phản hồi: 30 ngày
      `.trim()
    },
    
    {
      id: "cookies",
      title: "7. Cookies và Công Nghệ Theo Dõi",
      content: `
Chúng tôi sử dụng cookies và công nghệ tương tự để cải thiện trải nghiệm của bạn.

### 7.1. Loại Cookies

• **Cookies cần thiết**: Đảm bảo website hoạt động
• **Cookies hiệu suất**: Phân tích cách sử dụng website
• **Cookies chức năng**: Ghi nhớ tùy chọn của bạn
• **Cookies quảng cáo**: Hiển thị quảng cáo phù hợp

### 7.2. Quản Lý Cookies

Bạn có thể:
• Chấp nhận hoặc từ chối cookies qua banner cookie
• Xóa cookies trong cài đặt trình duyệt
• Chặn cookies (có thể ảnh hưởng chức năng website)

Xem thêm: [Chính sách Cookie](/cookies)
      `.trim()
    },
    
    {
      id: "tre-em",
      title: "8. Quyền Riêng Tư Của Trẻ Em",
      content: `
SalaryLens không dành cho trẻ em dưới 16 tuổi. Chúng tôi không cố ý thu thập thông tin từ trẻ em.

Nếu bạn là phụ huynh và phát hiện con bạn đã cung cấp thông tin, vui lòng liên hệ: support@salarylens.com

Chúng tôi sẽ xóa thông tin đó ngay lập tức.
      `.trim()
    },
    
    {
      id: "chuyen-du-lieu-quoc-te",
      title: "9. Chuyển Dữ Liệu Quốc Tế",
      content: `
Dữ liệu của bạn có thể được lưu trữ và xử lý ở:

• **Việt Nam**: Máy chủ chính
• **Singapore**: Máy chủ dự phòng
• **Hoa Kỳ**: Nhà cung cấp dịch vụ (AWS, Vercel)

Chúng tôi đảm bảo tuân thủ các tiêu chuẩn bảo vệ dữ liệu quốc tế (GDPR, CCPA) khi chuyển dữ liệu ra nước ngoài.
      `.trim()
    },
    
    {
      id: "thay-doi-chinh-sach",
      title: "10. Thay Đổi Chính Sách",
      content: `
Chúng tôi có thể cập nhật chính sách này theo thời gian. Các thay đổi quan trọng sẽ được thông báo qua:

• Email (nếu bạn đăng ký)
• Thông báo trên website
• Cập nhật "Ngày cập nhật cuối"

Việc bạn tiếp tục sử dụng dịch vụ sau khi thay đổi có nghĩa là bạn chấp nhận chính sách mới.
      `.trim()
    },
    
    {
      id: "lien-he",
      title: "11. Liên Hệ",
      content: `
Nếu bạn có câu hỏi về chính sách này, vui lòng liên hệ:

**Email**: support@salarylens.com  
**Địa chỉ**: [Địa chỉ công ty]  
**Điện thoại**: [Số điện thoại]

**Người chịu trách nhiệm bảo vệ dữ liệu**:  
[Tên] - dpo@salarylens.com

Chúng tôi cam kết phản hồi trong vòng 30 ngày.
      `.trim()
    }
  ]
};
```

---

## 🍪 COOKIE POLICY CONTENT

```typescript
// lib/legal/cookie-policy.ts

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
```

---

## 📋 TERMS OF SERVICE CONTENT

```typescript
// lib/legal/terms-of-service.ts

export const termsOfServiceContent = {
  title: "Điều Khoản Sử Dụng",
  subtitle: "Quy định và điều kiện khi sử dụng SalaryLens",
  lastUpdated: "17 tháng 12, 2024",
  
  sections: [
    {
      id: "chap-nhan-dieu-khoan",
      title: "1. Chấp Nhận Điều Khoản",
      content: `
Chào mừng bạn đến với SalaryLens!

Bằng cách truy cập và sử dụng website salarylens.com ("Dịch vụ"), bạn đồng ý tuân thủ các Điều khoản Sử dụng này ("Điều khoản").

### Nếu Bạn Không Đồng Ý

Vui lòng **KHÔNG** sử dụng dịch vụ của chúng tôi.

### Thay Đổi Điều Khoản

Chúng tôi có thể cập nhật Điều khoản bất kỳ lúc nào. Việc tiếp tục sử dụng sau khi có thay đổi nghĩa là bạn chấp nhận điều khoản mới.
      `.trim()
    },
    
    {
      id: "dich-vu",
      title: "2. Mô Tả Dịch Vụ",
      content: `
SalaryLens cung cấp:

### 2.1. Công Cụ Tính Lương

• Tính lương Gross ↔ Net
• Phân tích thuế TNCN (theo luật 2026)
• Tính bảo hiểm (BHXH, BHYT, BHTN)
• Breakdown chi tiết các khoản thu nhập

### 2.2. AI Assistant

• Tư vấn tài chính cá nhân
• Phân tích mức lương
• Gợi ý tối ưu thuế
• Hỗ trợ đàm phán lương

### 2.3. Nội Dung Giáo Dục

• Blog về tài chính cá nhân
• Hướng dẫn tính lương
• Thông tin về luật thuế
• Mẹo quản lý thu nhập

### 2.4. Dịch Vụ Miễn Phí

Tất cả các tính năng cốt lõi hiện **MIỄN PHÍ** cho người dùng.
      `.trim()
    },
    
    {
      id: "dang-ky-tai-khoan",
      title: "3. Đăng Ký Tài Khoản",
      content: `
### 3.1. Điều Kiện Đăng Ký

Bạn phải:
• Từ 16 tuổi trở lên
• Cung cấp thông tin chính xác
• Duy trì tính bảo mật tài khoản
• Không chia sẻ tài khoản cho người khác

### 3.2. Trách Nhiệm Của Bạn

• Giữ mật khẩu an toàn
• Cập nhật thông tin khi cần
• Thông báo nếu tài khoản bị xâm nhập
• Chịu trách nhiệm cho mọi hoạt động trong tài khoản

### 3.3. Chúng Tôi Có Quyền

• Từ chối đăng ký
• Đình chỉ hoặc xóa tài khoản vi phạm
• Yêu cầu xác minh danh tính
      `.trim()
    },
    
    {
      id: "quyen-su-dung",
      title: "4. Quyền Sử Dụng",
      content: `
### 4.1. Giấy Phép Sử Dụng

Chúng tôi cấp cho bạn quyền:
• Sử dụng dịch vụ cho mục đích cá nhân
• Truy cập và sử dụng các tính năng
• Lưu trữ kết quả tính toán

### 4.2. Hạn Chế

Bạn KHÔNG được:
• ❌ Sao chép, sửa đổi hoặc phân phối dịch vụ
• ❌ Reverse engineer hoặc decompile code
• ❌ Sử dụng bot, scraper hoặc automated tools
• ❌ Khai thác dữ liệu để bán hoặc cạnh tranh
• ❌ Overload hoặc hack hệ thống
• ❌ Sử dụng cho mục đích thương mại chưa được phép
      `.trim()
    },
    
    {
      id: "noi-dung-nguoi-dung",
      title: "5. Nội Dung Người Dùng",
      content: `
### 5.1. Nội Dung Bạn Tạo

Khi bạn gửi nội dung (phản hồi, bình luận, v.v.):

• Bạn giữ quyền sở hữu nội dung
• Bạn cấp cho chúng tôi quyền sử dụng, hiển thị, phân phối
• Bạn chịu trách nhiệm về nội dung của mình

### 5.2. Nội Dung Bị Cấm

Không được đăng:
• Nội dung vi phạm pháp luật
• Spam, quảng cáo
• Thông tin sai lệch, lừa đảo
• Nội dung xúc phạm, phân biệt đối xử
• Thông tin cá nhân của người khác
• Vi phạm bản quyền

### 5.3. Xử Lý Vi Phạm

Chúng tôi có thể:
• Xóa nội dung vi phạm
• Đình chỉ tài khoản
• Báo cáo cho cơ quan chức năng
      `.trim()
    },
    
    {
      id: "quyen-so-huu-tri-tue",
      title: "6. Quyền Sở Hữu Trí Tuệ",
      content: `
### 6.1. Quyền Của Chúng Tôi

Tất cả nội dung trên SalaryLens thuộc sở hữu của chúng tôi:

• Code, thiết kế, giao diện
• Logo, thương hiệu, tài sản
• Nội dung bài viết, hướng dẫn
• Thuật toán tính toán

### 6.2. Bảo Vệ

• Copyright © 2024 SalaryLens
• Được bảo vệ bởi luật sở hữu trí tuệ Việt Nam và quốc tế
• Mọi vi phạm sẽ bị xử lý theo pháp luật

### 6.3. Thương Hiệu

• "SalaryLens" là thương hiệu đã đăng ký
• Logo và slogan được bảo vệ
• Không được sử dụng mà không có sự cho phép
      `.trim()
    },
    
    {
      id: "tuyen-bo-tu-choi-trach-nhiem",
      title: "7. Tuyên Bố Từ Chối Trách Nhiệm",
      content: `
### 7.1. "AS IS" - Nguyên Trạng

Dịch vụ được cung cấp "nguyên trạng" không có bảo đảm:

• Chúng tôi không đảm bảo tính chính xác 100%
• Chúng tôi không chịu trách nhiệm về quyết định tài chính của bạn
• Kết quả tính toán chỉ mang tính tham khảo

### 7.2. Không Thay Thế Chuyên Gia

SalaryLens **KHÔNG** thay thế:
• Kế toán chuyên nghiệp
• Tư vấn thuế
• Tư vấn tài chính
• Tư vấn pháp lý

### 7.3. Độ Chính Xác

• Chúng tôi cố gắng cập nhật luật thuế mới nhất
• Tuy nhiên, luật có thể thay đổi
• Kiểm tra với cơ quan thuế để xác nhận chính xác

### 7.4. Không Đảm Bảo

Chúng tôi không đảm bảo:
• Dịch vụ luôn khả dụng 100%
• Không có lỗi hoặc gián đoạn
• Dữ liệu không bị mất

### 7.5. Sử Dụng Có Rủi Ro

Bạn sử dụng dịch vụ với rủi ro của mình.
      `.trim()
    },
    
    {
      id: "gioi-han-trach-nhiem",
      title: "8. Giới Hạn Trách Nhiệm",
      content: `
### 8.1. Không Chịu Trách Nhiệm

Chúng tôi KHÔNG chịu trách nhiệm về:

• **Thiệt hại trực tiếp**: Mất dữ liệu, mất doanh thu
• **Thiệt hại gián tiếp**: Mất cơ hội, mất lợi nhuận
• **Quyết định sai**: Dựa trên kết quả tính toán
• **Sai sót**: Trong nội dung, tính toán
• **Hành vi bên thứ ba**: Liên kết, quảng cáo

### 8.2. Giới Hạn Tối Đa

Trong mọi trường hợp, trách nhiệm của chúng tôi không vượt quá:
• Số tiền bạn đã trả (nếu có)
• 100.000 VND (nếu dịch vụ miễn phí)

### 8.3. Ngoại Lệ

Giới hạn này không áp dụng cho:
• Thiệt hại do cố ý gây ra
• Vi phạm quyền riêng tư nghiêm trọng
• Các trường hợp pháp luật quy định
      `.trim()
    },
    
    {
      id: "boi-thuong",
      title: "9. Bồi Thường",
      content: `
Bạn đồng ý bồi thường và bảo vệ SalaryLens khỏi:

• Khiếu nại từ việc bạn vi phạm điều khoản
• Nội dung bạn đăng vi phạm quyền người khác
• Hành vi vi phạm pháp luật của bạn
• Sử dụng dịch vụ không đúng mục đích

Bạn chịu trách nhiệm chi phí pháp lý và bồi thường nếu có.
      `.trim()
    },
    
    {
      id: "cham-dut",
      title: "10. Chấm Dứt",
      content: `
### 10.1. Bởi Bạn

• Bạn có thể ngừng sử dụng bất kỳ lúc nào
• Xóa tài khoản trong cài đặt
• Liên hệ support để xóa dữ liệu

### 10.2. Bởi Chúng Tôi

Chúng tôi có thể đình chỉ/chấm dứt tài khoản nếu:
• Bạn vi phạm điều khoản
• Nghi ngờ hoạt động gian lận
• Yêu cầu của cơ quan chức năng
• Ngừng cung cấp dịch vụ

### 10.3. Hậu Quả

Khi chấm dứt:
• Quyền truy cập bị hủy ngay lập tức
• Dữ liệu có thể bị xóa (trừ khi pháp luật yêu cầu giữ)
• Các điều khoản vẫn có hiệu lực (bồi thường, giới hạn trách nhiệm)
      `.trim()
    },
    
    {
      id: "luat-ap-dung",
      title: "11. Luật Áp Dụng và Giải Quyết Tranh Chấp",
      content: `
### 11.1. Luật Điều Chỉnh

Các điều khoản này được điều chỉnh bởi:
• Luật pháp Việt Nam
• Các quy định về thương mại điện tử
• Luật bảo vệ quyền lợi người tiêu dùng

### 11.2. Giải Quyết Tranh Chấp

**Bước 1 - Thương lượng**:
• Liên hệ: support@salarylens.com
• Thời gian giải quyết: 30 ngày

**Bước 2 - Hòa giải**:
• Qua cơ quan hòa giải tiêu dùng

**Bước 3 - Tòa án**:
• Tòa án có thẩm quyền tại Việt Nam
• Ngôn ngữ tố tụng: Tiếng Việt

### 11.3. Ngôn Ngữ

Bản tiếng Việt là bản chính thức. Bản dịch tiếng Anh chỉ mang tính tham khảo.
      `.trim()
    },
    
    {
      id: "dieu-khoan-khac",
      title: "12. Điều Khoản Khác",
      content: `
### 12.1. Toàn Bộ Thỏa Thuận

Các điều khoản này là toàn bộ thỏa thuận giữa bạn và SalaryLens.

### 12.2. Tách Rời

Nếu một điều khoản không hợp lệ, các điều khoản khác vẫn có hiệu lực.

### 12.3. Không Từ Bỏ Quyền

Việc chúng tôi không thực thi quyền không có nghĩa là từ bỏ quyền đó.

### 12.4. Chuyển Giao

• Bạn không được chuyển giao quyền/nghĩa vụ
• Chúng tôi có thể chuyển giao quyền khi cần (sáp nhập, bán)

### 12.5. Force Majeure

Chúng tôi không chịu trách nhiệm về sự kiện bất khả kháng:
• Thiên tai
• Chiến tranh, khủng bố
• Sự cố internet toàn cầu
• Thay đổi luật pháp đột ngột
      `.trim()
    },
    
    {
      id: "lien-he",
      title: "13. Liên Hệ",
      content: `
Câu hỏi về điều khoản? Liên hệ:

**Địa chỉ Email**: support@salarylens.com  
**Địa chỉ**: [Địa chỉ công ty của bạn]  
**Điện thoại**: [Số điện thoại]

**Thời gian hỗ trợ**:
• Thứ 2 - Thứ 6: 9:00 - 18:00
• Thứ 7: 9:00 - 12:00
• Chủ nhật: Nghỉ

**Phản hồi trong**: 2 ngày làm việc

---

**Cảm ơn bạn đã sử dụng SalaryLens!** 💙
      `.trim()
    }
  ]
};
```

---

## 🎨 PAGE COMPONENTS

### **Shared Legal Page Layout:**

```typescript
// app/(legal)/layout.tsx

import { Shield Check } from 'lucide-react';
import Link from 'next/link';

export default function LegalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-50">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition">
              <ShieldCheck className="w-7 h-7 text-blue-600" />
              <span className="text-xl font-bold">SalaryLens</span>
            </Link>

            {/* Navigation */}
            <nav className="hidden md:flex gap-6">
              <Link 
                href="/privacy" 
                className="text-gray-600 hover:text-blue-600 transition"
              >
                Bảo mật
              </Link>
              <Link 
                href="/cookies" 
                className="text-gray-600 hover:text-blue-600 transition"
              >
                Cookie
              </Link>
              <Link 
                href="/terms" 
                className="text-gray-600 hover:text-blue-600 transition"
              >
                Điều khoản
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        {children}
      </main>

      {/* Footer */}
      <footer className="border-t bg-white/50 backdrop-blur-sm mt-20">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center text-sm text-gray-600">
            <p>© 2024 SalaryLens. All rights reserved.</p>
            <div className="flex justify-center gap-4 mt-2">
              <Link href="/privacy" className="hover:text-blue-600">
                Bảo mật
              </Link>
              <Link href="/cookies" className="hover:text-blue-600">
                Cookie
              </Link>
              <Link href="/terms" className="hover:text-blue-600">
                Điều khoản
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
```

---

### **Privacy Policy Page:**

```typescript
// app/(legal)/privacy/page.tsx

import { privacyPolicyContent } from '@/lib/legal/privacy-policy';
import { LegalPage } from '@/components/legal/legal-page';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Chính Sách Bảo Mật | SalaryLens',
  description: 'Tìm hiểu cách SalaryLens thu thập, sử dụng và bảo vệ thông tin cá nhân của bạn',
};

export default function PrivacyPage() {
  return <LegalPage content={privacyPolicyContent} />;
}
```

---

### **Cookie Policy Page:**

```typescript
// app/(legal)/cookies/page.tsx

import { cookiePolicyContent } from '@/lib/legal/cookie-policy';
import { LegalPage } from '@/components/legal/legal-page';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Chính Sách Cookie | SalaryLens',
  description: 'Tìm hiểu cách SalaryLens sử dụng cookies và công nghệ theo dõi',
};

export default function CookiesPage() {
  return <LegalPage content={cookiePolicyContent} />;
}
```

---

### **Terms of Service Page:**

```typescript
// app/(legal)/terms/page.tsx

import { termsOfServiceContent } from '@/lib/legal/terms-of-service';
import { LegalPage } from '@/components/legal/legal-page';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Điều Khoản Sử Dụng | SalaryLens',
  description: 'Quy định và điều kiện khi sử dụng dịch vụ SalaryLens',
};

export default function TermsPage() {
  return <LegalPage content={termsOfServiceContent} />;
}
```

---

### **Reusable Legal Page Component:**

```typescript
// components/legal/legal-page.tsx

'use client';

import { useState } from 'react';
import { ChevronRight, Calendar, FileText } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

interface LegalContent {
  title: string;
  subtitle: string;
  lastUpdated: string;
  sections: Array<{
    id: string;
    title: string;
    content: string;
  }>;
}

export function LegalPage({ content }: { content: LegalContent }) {
  const [activeSection, setActiveSection] = useState<string | null>(null);

  return (
    <div className="max-w-5xl mx-auto">
      {/* Header */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm mb-4">
          <FileText className="w-4 h-4" />
          <span>Legal Document</span>
        </div>
        
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          {content.title}
        </h1>
        
        <p className="text-lg text-gray-600 mb-6">
          {content.subtitle}
        </p>
        
        <div className="inline-flex items-center gap-2 text-sm text-gray-500">
          <Calendar className="w-4 h-4" />
          <span>Cập nhật lần cuối: {content.lastUpdated}</span>
        </div>
      </div>

      {/* Table of Contents (Mobile Dropdown) */}
      <div className="lg:hidden mb-8">
        <div className="bg-white rounded-lg shadow-sm border p-4">
          <button
            onClick={() => setActiveSection(activeSection ? null : 'toc')}
            className="flex items-center justify-between w-full"
          >
            <span className="font-semibold">Mục lục</span>
            <ChevronRight 
              className={`w-5 h-5 transition-transform ${
                activeSection === 'toc' ? 'rotate-90' : ''
              }`} 
            />
          </button>
          
          {activeSection === 'toc' && (
            <nav className="mt-4 space-y-2">
              {content.sections.map((section) => (
                <a
                  key={section.id}
                  href={`#${section.id}`}
                  className="block py-2 px-3 text-sm text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded transition"
                  onClick={() => setActiveSection(null)}
                >
                  {section.title}
                </a>
              ))}
            </nav>
          )}
        </div>
      </div>

      <div className="lg:grid lg:grid-cols-12 lg:gap-8">
        {/* Sidebar TOC (Desktop) */}
        <aside className="hidden lg:block lg:col-span-3">
          <div className="sticky top-24 bg-white rounded-lg shadow-sm border p-6">
            <h2 className="font-semibold text-gray-900 mb-4">Mục lục</h2>
            <nav className="space-y-2">
              {content.sections.map((section) => (
                <a
                  key={section.id}
                  href={`#${section.id}`}
                  className="block py-2 px-3 text-sm text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded transition"
                >
                  {section.title}
                </a>
              ))}
            </nav>
          </div>
        </aside>

        {/* Content */}
        <div className="lg:col-span-9">
          <div className="bg-white rounded-lg shadow-sm border">
            <article className="prose prose-blue max-w-none p-6 md:p-10">
              {content.sections.map((section, index) => (
                <section 
                  key={section.id} 
                  id={section.id}
                  className={index > 0 ? 'mt-12' : ''}
                >
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">
                    {section.title}
                  </h2>
                  <ReactMarkdown
                    className="text-gray-700 leading-relaxed"
                    components={{
                      h3: ({ children }) => (
                        <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">
                          {children}
                        </h3>
                      ),
                      ul: ({ children }) => (
                        <ul className="list-disc list-inside space-y-2 my-4">
                          {children}
                        </ul>
                      ),
                      ol: ({ children }) => (
                        <ol className="list-decimal list-inside space-y-2 my-4">
                          {children}
                        </ol>
                      ),
                      table: ({ children }) => (
                        <div className="overflow-x-auto my-6">
                          <table className="min-w-full divide-y divide-gray-200 border">
                            {children}
                          </table>
                        </div>
                      ),
                      th: ({ children }) => (
                        <th className="px-4 py-3 bg-gray-50 text-left text-sm font-semibold text-gray-900">
                          {children}
                        </th>
                      ),
                      td: ({ children }) => (
                        <td className="px-4 py-3 text-sm text-gray-700 border-t">
                          {children}
                        </td>
                      ),
                    }}
                  >
                    {section.content}
                  </ReactMarkdown>
                </section>
              ))}
            </article>

            {/* Contact CTA */}
            <div className="border-t p-6 md:p-10 bg-gradient-to-br from-blue-50 to-emerald-50">
              <div className="text-center">
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  Có câu hỏi?
                </h3>
                <p className="text-gray-600 mb-4">
                  Liên hệ với chúng tôi nếu bạn cần hỗ trợ hoặc làm rõ
                </p>
                <a
                  href="mailto:support@salarylens.com"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                >
                  <FileText className="w-5 h-5" />
                  <span>Gửi email cho chúng tôi</span>
                </a>
              </div>
            </div>
          </div>

          {/* Back to top */}
          <div className="mt-6 text-center">
            <a
              href="#"
              className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 transition"
            >
              <ChevronRight className="w-4 h-4 rotate-[270deg]" />
              <span>Về đầu trang</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
```

---

## ✅ IMPLEMENTATION CHECKLIST

```
Setup:
□ Create (legal) route group
□ Install react-markdown
□ Create content files
□ Create components

Content:
□ Customize company info
□ Add actual addresses/emails
□ Review legal accuracy
□ Translate if needed

Styling:
□ Match brand colors
□ Test mobile responsive
□ Add animations
□ Optimize readability

SEO:
□ Add metadata
□ Create sitemap entries
□ Submit to search console

Legal:
□ Review by lawyer (optional)
□ Get approval
□ Set update reminders
```

---

**Complete! Ready to implement! 📜✨**

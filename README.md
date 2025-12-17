# Vietnam POI Map - Bản Đồ Điểm Quan Tâm Việt Nam

Một ứng dụng web React cho phép người dùng nhập vào tên một địa điểm ở Việt Nam và hiển thị 5 điểm quan tâm (Points of Interest) trên bản đồ OpenStreetMap.

## Tính Năng

- � **Đăng ký & Đăng nhập**: Email/Password hoặc Google Sign-in
- �🔍 **Tìm kiếm địa điểm**: Nhập tên bất kỳ địa điểm ở Việt Nam
- 🗺️ **Hiển thị bản đồ**: Sử dụng OpenStreetMap để hiển thị vị trí
- 📍 **5 Điểm quan tâm**: Hiển thị tự động 5 POI gần vị trí tìm kiếm
- 💾 **Danh sách POI**: Liệt kê tên và loại của mỗi điểm quan tâm
- 🌤️ **Thông tin thời tiết**: Hiển thị nhiệt độ, tốc độ gió, độ ẩm, tình trạng thời tiết
- 🌐 **Dịch thuật Anh-Việt**: Popup nhỏ cho phép dịch câu tiếng Anh sang tiếng Việt
- 📱 **Responsive Design**: Hoạt động tốt trên desktop, tablet và mobile
- ✨ **Giao diện đẹp**: UI/UX hiện đại với animation mượt mà

## Công Nghệ Sử Dụng

- **Frontend Framework**: React 18
- **Build Tool**: Vite
- **Authentication**: Firebase (Email/Password + Google Sign-in)
- **Bản đồ**: Leaflet + OpenStreetMap (OpenStreetMap tiles)
- **Geocoding**: Nominatim API (OpenStreetMap)
- **POI Data**: OpenStreetMap database
- **Thời tiết**: Open-Meteo API (miễn phí, không cần API key)
- **Dịch thuật**: MyMemory Translated API
- **Styling**: CSS3 với gradients và animations

## Cài Đặt

### Yêu Cầu
- Node.js 16+ 
- npm hoặc yarn

### Bước 1: Clone hoặc tải dự án
```bash
cd /workspaces/24127031_LAB04
```

### Bước 2: Cài đặt dependencies
```bash
npm install
```

### Bước 3: Chạy ứng dụng
```bash
npm run dev
```

Ứng dụng sẽ chạy tại `http://localhost:5173`

### Bước 4: Build cho production
```bash
npm run build
```

## Cách Sử Dụng

### Bước 1: Đăng nhập / Đăng ký
- Chọn một phương thức:
  - **Email/Password**: Nhập email và mật khẩu, click "Đăng ký" hoặc "Đăng nhập"
  - **Google**: Click nút "Đăng nhập với Google", chọn tài khoản Google

### Bước 2: Tìm kiếm địa điểm
- Nhập tên địa điểm vào ô tìm kiếm (VD: "Hà Nội", "Đà Nẵng", "Hạ Long")
- Click nút "Tìm kiếm" hoặc nhấn Enter
- Hoặc click vào một gợi ý nhanh

### Bước 3: Xem kết quả
- Bản đồ sẽ hiển thị vị trí địa điểm được tìm kiếm
- Danh sách 5 điểm quan tâm sẽ được hiển thị
- Trên bản đồ, marker chính (màu xanh) là vị trí tìm kiếm, các marker số 1-5 (màu sắc khác nhau) là những điểm quan tâm
- Vòng tròn xanh bao quanh vị trí tìm kiếm (bán kính 5km)
- Thông tin thời tiết tại địa điểm được hiển thị

### Bước 4: Tương tác với bản đồ
- Click vào bất kỳ marker nào để xem thông tin chi tiết
- Scroll để zoom in/out
- Kéo để di chuyển bản đồ

### Bước 5: Dịch thuật Anh-Việt
- Click nút 🌐 ở góc dưới phải
- Nhập câu tiếng Anh cần dịch
- Click "🔄 Dịch" để dịch sang tiếng Việt
- Có thể "📋 Copy" kết quả để sử dụng

### Bước 6: Đăng xuất
- Click nút 🚪 ở góc trên phải
- Xác nhận đăng xuất

## Cấu Trúc Thư Mục

```
.
├── src/
│   ├── components/
│   │   ├── SearchLocation.jsx      # Component tìm kiếm
│   │   ├── SearchLocation.css      # Style tìm kiếm
│   │   ├── MapDisplay.jsx          # Component hiển thị bản đồ
│   │   └── MapDisplay.css          # Style bản đồ
│   ├── App.jsx                     # Component chính
│   ├── App.css                     # Style chính
│   ├── main.jsx                    # Entry point
│   └── index.css                   # Global styles
├── index.html                      # HTML chính
├── package.json                    # Dependencies
├── vite.config.js                  # Vite configuration
└── README.md                       # Tài liệu này
```

## API Được Sử Dụng

### 1. Nominatim (Geocoding)
- **URL**: https://nominatim.openstreetmap.org/search
- **Mục đích**: Chuyển đổi tên địa điểm thành tọa độ (latitude, longitude)
- **Miễn phí**: Có
- **Rate Limit**: 1 request/giây

### 3. Open-Meteo (Thời tiết)
- **URL**: https://api.open-meteo.com/v1/forecast
- **Mục đích**: Lấy dữ liệu thời tiết hiện tại (nhiệt độ, độ ẩm, gió, mã thời tiết)
- **Miễn phí**: Có, không cần API key
- **Ưu điểm**: Nhanh, ổn định, miễn phí hoàn toàn
- **Dữ liệu**: Nhiệt độ, độ ẩm, tốc độ gió, mô tả thời tiết

### 4. MyMemory Translated (Dịch thuật)
- **URL**: https://api.mymemory.translated.net/get
- **Mục đích**: Dịch câu từ tiếng Anh sang tiếng Việt
- **Miễn phí**: Có, không cần API key
- **Ưu điểm**: Hoàn toàn miễn phí, không yêu cầu xác thực, ổn định
- **Hỗ trợ**: Hơn 100 ngôn ngữ

### 5. OpenStreetMap Tiles
- **URL**: https://tile.openstreetmap.org/
- **Mục đích**: Hiển thị bản đồ nền
- **Miễn phí**: Có, cần tuân thủ usage policy

## Ví Dụ Địa Điểm Gợi Ý

- **Hà Nội**: Thủ đô, nhiều di tích lịch sử
- **TP. Hồ Chí Minh**: Thành phố lớn nhất
- **Đà Nẵng**: Thành phố ven biển
- **Hạ Long**: Danh thắng UNESCO
- **Hội An**: Thành phố cổ kính

## Các Vấn Đề Có Thể Gặp

### Bản đồ không hiển thị
- Kiểm tra kết nối internet
- Kiểm tra console có lỗi nào không
- Thử reload trang

### Không tìm thấy địa điểm
- Đảm bảo tên địa điểm đúng chính tả
- Thử thêm "Việt Nam" vào cuối
- Ví dụ: "Hà Nội, Việt Nam" thay vì chỉ "Hà Nội"

### Không tìm thấy POI
- Một số khu vực có ít dữ liệu POI trên OpenStreetMap
- Thử các khu vực lớn như Hà Nội, TP. Hồ Chí Minh
- Chờ 1-2 giây, Overpass API có thể chậm

### Lỗi CORS
- Đảm bảo tất cả API sử dụng đúng endpoint công khai
- Nominatim, Overpass, và OpenStreetMap tiles đều cho phép requests từ browser

## Giới Hạn

- Bản đồ hiển thị tối đa 5 POI
- Tìm kiếm trong bán kính 5km quanh địa điểm
- Overpass API có thể chậm nếu có nhiều requests cùng lúc

## Phát Triển Tiếp

- [ ] Thêm filter theo loại POI (nhà hàng, khách sạn, bảo tàng, etc.)
- [ ] Lưu các tìm kiếm yêu thích
- [ ] Hiển thị hình ảnh của POI
- [ ] Thêm rating/review từ OpenStreetMap
- [ ] Export danh sách POI thành PDF/Excel
- [ ] Tìm kiếm bằng bán kính tùy chỉnh
- [ ] Dự báo thời tiết 7 ngày
- [ ] Dark mode
- [ ] Thêm cảnh báo thời tiết (gió mạnh, mưa lớn, etc.)
- [ ] Hỗ trợ dịch thuật hai chiều (Việt → Anh)
- [ ] Thêm các ngôn ngữ khác vào dịch thuật

## License

MIT

## Tác Giả

- LAB04 - 2024
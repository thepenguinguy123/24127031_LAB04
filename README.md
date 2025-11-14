# Vietnam POI Map - Bản Đồ Điểm Quan Tâm Việt Nam

Một ứng dụng web React cho phép người dùng nhập vào tên một địa điểm ở Việt Nam và hiển thị 5 điểm quan tâm (Points of Interest) trên bản đồ OpenStreetMap.

## Tính Năng

- 🔍 **Tìm kiếm địa điểm**: Nhập tên bất kỳ địa điểm ở Việt Nam
- 🗺️ **Hiển thị bản đồ**: Sử dụng OpenStreetMap để hiển thị vị trí
- 📍 **5 Điểm quan tâm**: Hiển thị tự động 5 POI gần vị trí tìm kiếm
- 💾 **Danh sách POI**: Liệt kê tên và loại của mỗi điểm quan tâm
- 📱 **Responsive Design**: Hoạt động tốt trên desktop, tablet và mobile
- ✨ **Giao diện đẹp**: UI/UX hiện đại với animation mượt mà

## Công Nghệ Sử Dụng

- **Frontend Framework**: React 18
- **Build Tool**: Vite
- **Bản đồ**: Leaflet + OpenStreetMap (OpenStreetMap tiles)
- **Geocoding**: Nominatim API (OpenStreetMap)
- **POI Data**: Overpass API (OpenStreetMap)
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

1. **Tìm kiếm địa điểm**:
   - Nhập tên địa điểm vào ô tìm kiếm (VD: "Hà Nội", "Đà Nẵng", "Hạ Long")
   - Click nút "Tìm kiếm" hoặc nhấn Enter
   - Hoặc click vào một gợi ý nhanh

2. **Xem kết quả**:
   - Bản đồ sẽ hiển thị vị trí địa điểm được tìm kiếm
   - Danh sách 5 điểm quan tâm sẽ được hiển thị
   - Trên bản đồ, marker chính (màu xanh) là vị trí tìm kiếm, các marker số 1-5 (màu sắc khác nhau) là những điểm quan tâm

3. **Tương tác với bản đồ**:
   - Click vào bất kỳ marker nào để xem thông tin chi tiết
   - Scroll để zoom in/out
   - Kéo để di chuyển bản đồ

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

### 2. Overpass API (POI Data)
- **URL**: https://overpass-api.de/api/interpreter
- **Mục đích**: Lấy dữ liệu các điểm quan tâm (tourism, amenities, historic sites) trong bán kính 5km
- **Miễn phí**: Có
- **Note**: Đôi khi chậm do tải cao

### 3. OpenStreetMap Tiles
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
- [ ] Dark mode

## License

MIT

## Tác Giả

- LAB04 - 2024
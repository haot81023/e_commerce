// Import axios đã cấu hình sẵn từ file nội bộ
import axios from './axios';

// Import kiểu dữ liệu LoginRequest (dữ liệu gửi đi) và LoginResponse (dữ liệu nhận về)
import { LoginRequest, LoginResponse } from './types';

// Import AxiosError để xử lý lỗi của axios
import { AxiosError } from 'axios';


// Khai báo class AuthService để xử lý các logic liên quan đến xác thực người dùng (login/logout, token, user)
class AuthService {
    // Biến static để đảm bảo chỉ có một instance (singleton pattern)
    private static instance: AuthService;

    // Khóa (key) để lưu token trong localStorage
    private tokenKey = 'token';

    // Khóa để lưu thông tin người dùng trong localStorage
    private userKey = 'user';

    // Constructor đặt là private để không tạo được instance từ bên ngoài class
    private constructor() {}

    // Phương thức để lấy instance duy nhất (singleton)
    public static getInstance(): AuthService {
        // Nếu chưa có instance thì tạo mới
        if (!AuthService.instance) {
            AuthService.instance = new AuthService();
        }
        // Trả về instance hiện tại
        return AuthService.instance;
    }

    // Phương thức để xử lý đăng nhập
    async login(credentials: LoginRequest): Promise<LoginResponse> {
        try {
            // Gửi POST request đến API để đăng nhập
            const response = await axios.post<LoginResponse>('/Auth/login', credentials);

            // Lấy accessToken và thông tin user từ response
            const { accessToken, user } = response.data;

            // Debug response
            console.log("response.data", response.data);

            // Lưu thông tin user (tách riêng từng phần) vào localStorage
            localStorage.setItem("userName", response.data.userName);
            localStorage.setItem("email", response.data.email);
            localStorage.setItem("name", response.data.name);

            // Lưu accessToken và toàn bộ đối tượng user vào localStorage
            localStorage.setItem(this.tokenKey, accessToken);
            localStorage.setItem(this.userKey, JSON.stringify(user));

            // Debug sau khi lưu
            console.log('Token saved:', accessToken);
            console.log('User saved:', user);
            console.log('LocalStorage after login:', {
                token: localStorage.getItem(this.tokenKey),
                user: localStorage.getItem(this.userKey),
            });

            // Trả về dữ liệu đăng nhập
            return response.data;
        } catch (error) {
            // Nếu lỗi là từ axios, hiển thị thông báo lỗi thân thiện
            if (error instanceof AxiosError) {
                throw new Error(error.response?.data.title || 'Có lỗi xảy ra, vui lòng thử lại!');
            }
            // Nếu không phải lỗi axios, ném lỗi ra ngoài
            throw error;
        }
    }

    // Phương thức để đăng xuất
    async logout(): Promise<void> {
        // Xóa token và thông tin user khỏi localStorage
        localStorage.removeItem(this.tokenKey);
        localStorage.removeItem(this.userKey);
        localStorage.removeItem("userName");
        localStorage.removeItem("name");
        localStorage.removeItem("email");
    }

    // Kiểm tra xem người dùng có đang đăng nhập không (có token trong localStorage không)
    isAuthenticated(): boolean {
        return !!localStorage.getItem(this.tokenKey);
    }

    // Lấy token từ localStorage
    getToken(): string | null {
        return localStorage.getItem(this.tokenKey);
    }

    // Lấy tên người dùng (username) từ localStorage, có kiểm tra lỗi
    getUser() {
        try {
            const userStr = localStorage.getItem('userName');
            // Nếu null hoặc undefined, trả về null
            if (!userStr || userStr === "undefined") {
                return null;
            }
            // Trả về username
            return userStr;
        } catch (error) {
            // Nếu có lỗi khi đọc localStorage, log lỗi và trả về null
            console.error("Lỗi khi parse user từ localStorage:", error);
            return null;
        }
    }
}

// Tạo instance duy nhất của AuthService và export để sử dụng trong ứng dụng
export const authService = AuthService.getInstance();

// Export mặc định để sử dụng đơn giản hơn
export default authService;

// Dữ liệu bài viết Blog
const blogPosts = [
    {
        id: 1,
        title: "Nhập môn Lập trình Socket trong Java: Xây dựng ứng dụng Client-Server đầu tiên",
        category: "java",
        date: "12/10/2025",
        excerpt: "Bạn có bao giờ thắc mắc làm thế nào các ứng dụng chat, trình duyệt web hay game online có thể 'nói chuyện' với nhau qua Internet không? Bí mật nằm ở Socket...",
        content: `<h3>Nhập môn Lập trình Socket trong Java: Xây dựng ứng dụng Client-Server đầu tiên</h3>
<p><strong>Tác giả:</strong> Hieu's Story</p>
<p><strong>Ngày đăng:</strong> 12 tháng 10, 2025</p>
<p><strong>Chuyên mục:</strong> Lập trình mạng Java</p>

<p>Bạn có bao giờ thắc mắc làm thế nào các ứng dụng chat, trình duyệt web hay game online có thể "nói chuyện" với nhau qua Internet không? Bí mật nằm ở một trong những khái niệm nền tảng nhất của lập trình mạng: Socket. Thời còn đi học, mình cũng thấy khái niệm này khá trừu tượng. Nhưng hãy tin mình, một khi bạn tự tay viết được chương trình đầu tiên, mọi thứ sẽ trở nên vô cùng rõ ràng.</p>

<p>Trong bài viết này, chúng ta sẽ cùng nhau xây dựng một ứng dụng Client-Server siêu đơn giản để bạn hiểu được bản chất của vấn đề.</p>

<h4>Socket là gì? Hãy hình dung qua một cuộc điện thoại</h4>
<p>Cách dễ nhất để hiểu về Socket là liên tưởng đến một cuộc điện thoại:</p>

<p><strong>ServerSocket (Phía Server):</strong> Giống như một người đang ngồi chờ điện thoại reo. Anh ta có một số điện thoại (Port) và luôn trong trạng thái lắng nghe (listen).</p>

<p><strong>Socket (Phía Client):</strong> Giống như người muốn gọi điện. Anh ta cần biết số điện thoại của người nhận (IP Address và Port) để thực hiện cuộc gọi (connect).</p>

<p><strong>Luồng giao tiếp:</strong> Khi cuộc gọi được kết nối, một kênh giao tiếp hai chiều được hình thành. Cả hai có thể nói và nghe qua kênh này (InputStream và OutputStream).</p>

<h4>Bắt tay vào code: Xây dựng Server</h4>
<p>Server của chúng ta sẽ làm một nhiệm vụ đơn giản: lắng nghe kết nối ở cổng 6868, nhận một tin nhắn từ client, in ra màn hình và gửi lại một lời chào.</p>

<pre><code class="language-java">// File: SimpleServer.java
import java.io.*;
import java.net.*;

public class SimpleServer {
    public static void main(String[] args) {
        try (ServerSocket serverSocket = new ServerSocket(6868)) {
            System.out.println("Server đang chạy và chờ kết nối ở cổng 6868...");

            // Chấp nhận kết nối từ client
            Socket clientSocket = serverSocket.accept();
            System.out.println("Client đã kết nối!");

            // Luồng để nhận dữ liệu từ client
            InputStream input = clientSocket.getInputStream();
            BufferedReader reader = new BufferedReader(new InputStreamReader(input));

            // Luồng để gửi dữ liệu cho client
            OutputStream output = clientSocket.getOutputStream();
            PrintWriter writer = new PrintWriter(output, true);

            // Đọc tin nhắn từ client và gửi lại lời chào
            String clientMessage = reader.readLine();
            System.out.println("Nhận từ Client: " + clientMessage);
            writer.println("Chào bạn, tôi là Server!");

        } catch (IOException ex) {
            System.out.println("Lỗi Server: " + ex.getMessage());
        }
    }
}</code></pre>

<h4>Viết Client để kết nối</h4>
<p>Client sẽ kết nối đến Server tại địa chỉ localhost (chính máy của bạn) và cổng 6868, gửi đi một tin nhắn và chờ nhận phản hồi.</p>

<pre><code class="language-java">// File: SimpleClient.java
import java.io.*;
import java.net.*;

public class SimpleClient {
    public static void main(String[] args) {
        String hostname = "localhost";
        int port = 6868;

        try (Socket socket = new Socket(hostname, port)) {
            // Luồng để gửi dữ liệu đến server
            OutputStream output = socket.getOutputStream();
            PrintWriter writer = new PrintWriter(output, true);
            writer.println("Xin chào Server, tôi là Client!");

            // Luồng để nhận dữ liệu từ server
            InputStream input = socket.getInputStream();
            BufferedReader reader = new BufferedReader(new InputStreamReader(input));

            String serverResponse = reader.readLine();
            System.out.println("Nhận từ Server: " + serverResponse);

        } catch (UnknownHostException ex) {
            System.out.println("Không tìm thấy server.");
        } catch (IOException ex) {
            System.out.println("Lỗi I/O: " + ex.getMessage());
        }
    }
}</code></pre>

<h4>Lời kết</h4>
<p>Chúc mừng bạn! Bạn vừa hoàn thành ứng dụng mạng đầu tiên của mình. Dù đơn giản nhưng nó đã thể hiện đầy đủ các bước cốt lõi: lắng nghe, kết nối, gửi và nhận dữ liệu. Trong bài viết tiếp theo, chúng ta sẽ tìm hiểu cách nâng cấp Server này để có thể phục vụ nhiều Client cùng một lúc.</p>`,
        image: "image/img1.jpg"
    },
    {
        id: 2,
        title: "Nâng cấp Server Java với Đa luồng (Multithreading) để phục vụ nhiều Client cùng lúc",
        category: "java",
        date: "15/10/2025",
        excerpt: "Ở bài viết trước, chúng ta đã xây dựng thành công một Server đơn giản. Nhưng nó có một nhược điểm chí mạng: đó là...",
        content: `<h3>Nâng cấp Server Java với Đa luồng (Multithreading) để phục vụ nhiều Client</h3>
<p><strong>Tác giả:</strong> Hieu's Story</p>
<p><strong>Ngày đăng:</strong> 15 tháng 10, 2025</p>
<p><strong>Chuyên mục:</strong> Lập trình mạng Java</p>

<p>Ở bài viết trước, chúng ta đã xây dựng thành công một Server đơn giản. Nhưng nó có một nhược điểm chí mạng: tại một thời điểm, nó chỉ có thể phục vụ một Client duy nhất. Nếu Client thứ hai cố gắng kết nối trong khi Client đầu tiên chưa ngắt kết nối, nó sẽ phải "xếp hàng" chờ. Điều này rõ ràng là không khả thi với các ứng dụng thực tế.</p>

<p>Vậy làm thế nào để giải quyết? Câu trả lời chính là <strong>Đa luồng (Multithreading)</strong>. Hôm nay, chúng ta sẽ "biến hình" cho Server của mình để nó trở nên mạnh mẽ hơn, sẵn sàng chào đón nhiều Client cùng lúc.</p>

<h4>Tại sao Server cũ lại "yếu"?</h4>
<p>Vấn đề nằm ở dòng <code>serverSocket.accept()</code>. Lệnh này sẽ chặn (block) toàn bộ chương trình lại cho đến khi có một client kết nối. Sau khi kết nối, toàn bộ logic xử lý cho client đó cũng diễn ra trên luồng chính. Chừng nào việc xử lý chưa xong, Server không thể quay lại vòng lặp để <code>accept()</code> một kết nối mới.</p>

<h4>Giải pháp: Mỗi Client một "Nhân viên phục vụ"</h4>
<p>Ý tưởng của đa luồng rất trực quan:</p>
<p><strong>Luồng chính (Server):</strong> Đóng vai trò như một người quản lý. Nhiệm vụ duy nhất của nó là đứng ở cửa, chờ khách (Client) đến.</p>
<p><strong>Luồng phụ (Client Handler):</strong> Mỗi khi có một khách mới, người quản lý sẽ gọi một "nhân viên phục vụ" (Thread) riêng ra để chăm sóc vị khách đó.</p>
<p>Nhờ vậy, người quản lý luôn rảnh tay để đón khách mới, và mỗi vị khách đều được phục vụ song song bởi một nhân viên riêng.</p>

<h4>Triển khai Server Đa luồng</h4>
<p>Đầu tiên, chúng ta cần tạo một lớp <strong>ClientHandler</strong> để xử lý logic cho từng client. Lớp này sẽ <code>implement Runnable</code> để có thể chạy trên một luồng riêng.</p>

<pre><code class="language-java">// File: ClientHandler.java
import java.io.*;
import java.net.*;

public class ClientHandler implements Runnable {
    private Socket clientSocket;

    public ClientHandler(Socket socket) {
        this.clientSocket = socket;
    }

    public void run() {
        try {
            InputStream input = clientSocket.getInputStream();
            BufferedReader reader = new BufferedReader(new InputStreamReader(input));
            OutputStream output = clientSocket.getOutputStream();
            PrintWriter writer = new PrintWriter(output, true);

            String clientMessage;
            while ((clientMessage = reader.readLine()) != null) {
                System.out.println("Nhận từ " + clientSocket.getRemoteSocketAddress() + ": " + clientMessage);
                if ("bye".equalsIgnoreCase(clientMessage)) {
                    break;
                }
                writer.println("Server đã nhận: " + clientMessage);
            }
        } catch (IOException e) {
            System.out.println("Lỗi Client Handler: " + e.getMessage());
        } finally {
            try {
                clientSocket.close();
            } catch (IOException e) {
                // Bỏ qua
            }
        }
    }
}
</code></pre>

<p>Bây giờ, hãy sửa lại file Server chính. Thay vì tự mình xử lý, nó sẽ tạo một Thread mới cho mỗi kết nối.</p>

<pre><code class="language-java">// File: MultiThreadedServer.java
import java.io.*;
import java.net.*;

public class MultiThreadedServer {
    public static void main(String[] args) {
        try (ServerSocket serverSocket = new ServerSocket(6868)) {
            System.out.println("Server đa luồng đang chạy và chờ kết nối...");

            while (true) { // Vòng lặp vô tận để luôn chấp nhận client mới
                Socket clientSocket = serverSocket.accept();
                System.out.println("Client mới đã kết nối: " + clientSocket.getRemoteSocketAddress());
                
                // Tạo một luồng mới để xử lý client này
                ClientHandler clientHandler = new ClientHandler(clientSocket);
                new Thread(clientHandler).start();
            }

        } catch (IOException ex) {
            System.out.println("Lỗi Server: " + ex.getMessage());
        }
    }
}
</code></pre>

<h4>Kết luận</h4>
<p>Với cấu trúc này, Server của bạn đã sẵn sàng xử lý đồng thời nhiều kết nối. Đây chính là kiến trúc nền tảng cho hầu hết các ứng dụng mạng phía server. Bạn có thể mở nhiều cửa sổ terminal, chạy nhiều <strong>SimpleClient</strong> và sẽ thấy Server xử lý tất cả chúng một cách mượt mà.</p>`,
        image: "image/img2.png"
    },
    {
        id: 3,
        title: "Gửi và Nhận Đối tượng (Object) qua Mạng trong Java bằng Serialization",
        category: "java",
        date: "18/10/2025",
        excerpt: "Ở những bài trước, chúng ta chỉ gửi và nhận dữ liệu dạng chuỗi đơn giản. Trong bài này, bạn sẽ học cách truyền trực tiếp các đối tượng Java qua mạng bằng Serialization...",
        content: `<h3>Gửi và Nhận Đối tượng (Object) qua Mạng trong Java bằng Serialization</h3>
<p><strong>Tác giả:</strong> Hieu's Story</p>
<p><strong>Ngày đăng:</strong> 18 tháng 10, 2025</p>
<p><strong>Chuyên mục:</strong> Lập trình mạng Java</p>

<p>Ở những bài trước, chúng ta chỉ gửi và nhận dữ liệu dạng chuỗi (String) đơn giản. Nhưng trong thực tế, ứng dụng thường cần trao đổi những cấu trúc dữ liệu phức tạp hơn, ví dụ như thông tin một sinh viên, chi tiết một sản phẩm, hay một đơn hàng. Việc chuyển đổi các đối tượng này thành chuỗi rồi tách chuỗi ở phía nhận rất phiền phức và dễ gây lỗi.</p>

<p>May mắn thay, Java cung cấp một cơ chế mạnh mẽ gọi là <strong>Serialization</strong> để giải quyết triệt để vấn đề này. Nó cho phép "đóng băng" một đối tượng thành một luồng byte, gửi đi qua mạng, và "rã đông" nó trở lại thành đối tượng ban đầu.</p>

<h4>Serialization là gì?</h4>
<p><strong>Serialization</strong> là quá trình chuyển đổi trạng thái của một đối tượng thành một chuỗi byte. Ngược lại, <strong>Deserialization</strong> là quá trình tái tạo lại đối tượng từ chuỗi byte đó.</p>

<p>Để một đối tượng có thể được "đóng băng", lớp của nó phải <code>implement</code> một interface đánh dấu (marker interface) là <code>java.io.Serializable</code>. Interface này không có phương thức nào cả, nó chỉ đơn giản là một tín hiệu báo cho Java Virtual Machine (JVM) biết rằng "Này, tôi cho phép đối tượng của lớp này được serialize nhé!".</p>

<h4>Ví dụ: Gửi đối tượng Message</h4>
<p>Hãy tạo một lớp <strong>Message</strong> đơn giản. Lớp này sẽ chứa thông tin người gửi và nội dung tin nhắn.</p>

<pre><code class="language-java">// File: Message.java
import java.io.Serializable;

// Quan trọng: phải implement Serializable
public class Message implements Serializable {
    private String sender;
    private String content;

    public Message(String sender, String content) {
        this.sender = sender;
        this.content = content;
    }

    @Override
    public String toString() {
        return "Từ '" + sender + "': " + content;
    }
}
</code></pre>

<h4>Nâng cấp Server và Client</h4>
<p>Bây giờ, chúng ta sẽ sử dụng <code>ObjectOutputStream</code> để gửi đối tượng và <code>ObjectInputStream</code> để nhận đối tượng.</p>

<p><strong>Phía Server:</strong></p>

<pre><code class="language-java">// File: ObjectServer.java (Trích đoạn xử lý)
// ...
try (ServerSocket serverSocket = new ServerSocket(6868)) {
    System.out.println("Object Server đang chạy...");
    Socket clientSocket = serverSocket.accept();
    System.out.println("Client đã kết nối!");

    // Sử dụng ObjectInputStream để đọc đối tượng
    ObjectInputStream ois = new ObjectInputStream(clientSocket.getInputStream());
    Message receivedMessage = (Message) ois.readObject(); // Đọc và ép kiểu
    System.out.println("Đã nhận: " + receivedMessage);

    // Sử dụng ObjectOutputStream để gửi đối tượng
    ObjectOutputStream oos = new ObjectOutputStream(clientSocket.getOutputStream());
    Message responseMessage = new Message("Server", "Đã nhận được tin nhắn của bạn!");
    oos.writeObject(responseMessage);

} catch (IOException | ClassNotFoundException ex) {
    // ClassNotFoundException xảy ra khi không tìm thấy định nghĩa lớp của đối tượng được deserialize
    System.out.println("Lỗi Server: " + ex.getMessage());
}
// ...
</code></pre>

<p><strong>Phía Client:</strong></p>

<pre><code class="language-java">// File: ObjectClient.java (Trích đoạn xử lý)
// ...
try (Socket socket = new Socket("localhost", 6868)) {
    // Gửi đối tượng Message đến Server
    ObjectOutputStream oos = new ObjectOutputStream(socket.getOutputStream());
    Message messageToSend = new Message("Client", "Đây là một đối tượng!");
    oos.writeObject(messageToSend);

    // Nhận đối tượng Message từ Server
    ObjectInputStream ois = new ObjectInputStream(socket.getInputStream());
    Message serverResponse = (Message) ois.readObject();
    System.out.println("Phản hồi từ Server: " + serverResponse);

} catch (IOException | ClassNotFoundException ex) {
    System.out.println("Lỗi Client: " + ex.getMessage());
}
// ...
</code></pre>

<h4>Lời kết</h4>
<p><strong>Serialization</strong> là một công cụ cực kỳ mạnh mẽ giúp đơn giản hóa việc truyền tải dữ liệu phức tạp qua mạng trong Java. Thay vì phải lo lắng về định dạng dữ liệu, bạn chỉ cần tập trung vào logic nghiệp vụ của ứng dụng. Tuy nhiên, hãy lưu ý về vấn đề <strong>phiên bản (versioning)</strong> và <strong>bảo mật</strong> khi sử dụng serialization trong các hệ thống lớn và phức tạp.</p>`,
        image: "image/img3.png "
    },
    {
    id: 4,
    title: "Tương tác với API RESTful trong Java bằng HttpURLConnection",
    category: "java",
    date: "21/10/2025",
    excerpt: "Ngày nay, các ứng dụng hiếm khi hoạt động độc lập. Chúng thường xuyên cần giao tiếp với các dịch vụ bên ngoài để lấy dữ liệu, ví dụ như lấy thông tin thời tiết, danh sách sản phẩm, hay bài viết mới. Phương thức giao tiếp phổ biến nhất chính là thông qua API RESTful...",
    content: `<h3>Tương tác với API RESTful trong Java bằng HttpURLConnection</h3>
<p><strong>Tác giả:</strong> Hieu's Story</p>
<p><strong>Ngày đăng:</strong> 21 tháng 10, 2025</p>
<p><strong>Chuyên mục:</strong> Lập trình mạng Java</p>

<p>Ngày nay, các ứng dụng hiếm khi hoạt động độc lập. Chúng thường xuyên cần giao tiếp với các dịch vụ bên ngoài để lấy dữ liệu, ví dụ như lấy thông tin thời tiết, danh sách sản phẩm, hay bài viết mới. Phương thức giao tiếp phổ biến nhất chính là thông qua API RESTful.</p>

<p>Trong thế giới Java thuần (không dùng thư viện ngoài), <strong>HttpURLConnection</strong> là công cụ có sẵn để giúp bạn thực hiện các yêu cầu HTTP này. Mặc dù cú pháp của nó hơi dài dòng so với các thư viện hiện đại, nhưng việc hiểu cách nó hoạt động sẽ giúp bạn nắm vững bản chất của giao thức HTTP.</p>

<h4>API RESTful là gì?</h4>
<p>Hiểu đơn giản, API RESTful là một tiêu chuẩn kiến trúc để thiết kế các dịch vụ web. Nó sử dụng các phương thức HTTP quen thuộc để thực hiện các hành động:</p>

<ul>
<li><strong>GET:</strong> Lấy dữ liệu (ví dụ: lấy thông tin một người dùng)</li>
<li><strong>POST:</strong> Tạo mới dữ liệu (ví dụ: đăng ký một tài khoản mới)</li>
<li><strong>PUT:</strong> Cập nhật toàn bộ dữ liệu</li>
<li><strong>DELETE:</strong> Xóa dữ liệu</li>
</ul>

<p>Dữ liệu thường được trao đổi dưới định dạng JSON.</p>

<h4>Thực hành: Lấy dữ liệu từ JSONPlaceholder</h4>
<p>Chúng ta sẽ thực hành bằng cách gọi đến <a href="https://jsonplaceholder.typicode.com/">JSONPlaceholder</a>, một dịch vụ cung cấp API giả miễn phí, để lấy thông tin một bài post.</p>

<p><strong>URL:</strong> https://jsonplaceholder.typicode.com/posts/1</p>

<pre><code class="language-java">// File: SimpleApiClient.java
import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;

public class SimpleApiClient {
    public static void main(String[] args) {
        try {
            // 1. Tạo đối tượng URL
            URL url = new URL("https://jsonplaceholder.typicode.com/posts/1");

            // 2. Mở kết nối
            HttpURLConnection connection = (HttpURLConnection) url.openConnection();

            // 3. Thiết lập phương thức (GET là mặc định)
            connection.setRequestMethod("GET");

            // 4. Kiểm tra mã phản hồi (200 là OK)
            int responseCode = connection.getResponseCode();
            System.out.println("Response Code: " + responseCode);

            if (responseCode == HttpURLConnection.HTTP_OK) {
                // 5. Đọc nội dung phản hồi
                BufferedReader in = new BufferedReader(new InputStreamReader(connection.getInputStream()));
                String inputLine;
                StringBuilder response = new StringBuilder();

                while ((inputLine = in.readLine()) != null) {
                    response.append(inputLine);
                }
                in.close();

                // In kết quả JSON
                System.out.println("Response JSON: " + response.toString());
            } else {
                System.out.println("Yêu cầu GET không thành công.");
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}</code></pre>

<p>Khi chạy chương trình, bạn sẽ thấy mã phản hồi là <strong>200</strong> và một chuỗi JSON chứa thông tin chi tiết của bài post số 1 được in ra console.</p>

<h4>Gửi dữ liệu với phương thức POST</h4>
<p>Việc gửi dữ liệu (ví dụ: tạo một bài post mới) phức tạp hơn một chút. Bạn cần phải ghi dữ liệu JSON vào OutputStream của kết nối.</p>

<pre><code class="language-java">// File: PostRequestExample.java
import java.io.OutputStream;
import java.net.HttpURLConnection;
import java.net.URL;

public class PostRequestExample {
    public static void main(String[] args) {
        try {
            URL url = new URL("https://jsonplaceholder.typicode.com/posts");
            HttpURLConnection connection = (HttpURLConnection) url.openConnection();

            // 1. Thiết lập phương thức là POST
            connection.setRequestMethod("POST");
            connection.setRequestProperty("Content-Type", "application/json; utf-8");
            connection.setRequestProperty("Accept", "application/json");

            // 2. Cho phép gửi dữ liệu
            connection.setDoOutput(true);

            // 3. Dữ liệu JSON cần gửi
            String jsonInputString = "{\"title\": \"foo\", \"body\": \"bar\", \"userId\": 1}";

            // 4. Ghi dữ liệu vào luồng output
            try (OutputStream os = connection.getOutputStream()) {
                byte[] input = jsonInputString.getBytes("utf-8");
                os.write(input, 0, input.length);
            }

            // 5. In mã phản hồi
            int responseCode = connection.getResponseCode();
            System.out.println("Response Code: " + responseCode);

        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}</code></pre>

<h4>Lời kết</h4>
<p>Việc sử dụng <strong>HttpURLConnection</strong> cho thấy rõ các bước cần thiết để giao tiếp qua HTTP. Mặc dù trong các dự án thực tế, người ta thường dùng các thư viện như <strong>OkHttp</strong> hay <strong>Retrofit</strong> để code ngắn gọn hơn, nhưng kiến thức nền tảng này sẽ không bao giờ là thừa.</p>`,
    image: "image/img4.png"
},
    {
    id: 5,
    title: "Xây dựng một Ứng dụng Chat Room đơn giản bằng Java Socket",
    category: "java",
    date: "25/10/2025",
    excerpt: "Đến bây giờ, chúng ta đã đi qua những khái niệm cơ bản nhất của lập trình mạng trong Java: Socket, Đa luồng, và gửi nhận dữ liệu. Đã đến lúc kết hợp tất cả chúng lại để xây dựng một dự án thú vị và thực tế hơn: một Chat Room đơn giản...",
    content: `<h3>Xây dựng một Ứng dụng Chat Room đơn giản bằng Java Socket</h3>
<p><strong>Tác giả:</strong> Hieu's Story</p>
<p><strong>Ngày đăng:</strong> 25 tháng 10, 2025</p>
<p><strong>Chuyên mục:</strong> Lập trình mạng Java</p>

<p>Đến bây giờ, chúng ta đã đi qua những khái niệm cơ bản nhất của lập trình mạng trong Java: <strong>Socket</strong>, <strong>Đa luồng</strong>, và <strong>gửi nhận dữ liệu</strong>. Đã đến lúc kết hợp tất cả chúng lại để xây dựng một dự án thú vị và thực tế hơn: một <strong>Chat Room</strong> đơn giản.</p>

<p>Mục tiêu của chúng ta là xây dựng một <strong>Server</strong> có thể nhận tin nhắn từ bất kỳ Client nào và phát (broadcast) tin nhắn đó đến tất cả các Client khác đang kết nối. Đây chính là mô hình hoạt động của rất nhiều ứng dụng chat nhóm.</p>

<h4>Kiến trúc ứng dụng</h4>
<p>Ứng dụng của chúng ta sẽ bao gồm hai thành phần chính: <strong>Server</strong> và <strong>Client</strong>.</p>

<p><strong>Server:</strong></p>
<ul>
<li>Sử dụng <code>ServerSocket</code> để lắng nghe các kết nối mới.</li>
<li>Mỗi khi có client kết nối, tạo một luồng <code>ClientThread</code> riêng để xử lý.</li>
<li>Duy trì một danh sách (<code>List</code> hoặc <code>Set</code>) chứa tất cả các client đang hoạt động để có thể gửi tin nhắn cho mọi người.</li>
</ul>

<p><strong>ClientThread (trên Server):</strong></p>
<ul>
<li>Chứa logic để đọc tin nhắn liên tục từ một client cụ thể.</li>
<li>Khi nhận được một tin nhắn, nó sẽ gọi một phương thức của Server để broadcast tin nhắn đó đến tất cả client khác.</li>
</ul>

<p><strong>Client:</strong></p>
<ul>
<li>Chạy trên console, có hai luồng hoạt động song song.</li>
<li>Một luồng để gửi tin nhắn người dùng nhập vào.</li>
<li>Một luồng khác để lắng nghe và hiển thị tin nhắn từ Server.</li>
</ul>

<h4>Mã nguồn phía Server</h4>
<p>Server cần một phương thức để phát tin nhắn đến tất cả client đang kết nối.</p>

<pre><code class="language-java">// File: ChatServer.java
import java.io.*;
import java.net.*;
import java.util.*;

public class ChatServer {
    private int port;
    private Set&lt;PrintWriter&gt; clientWriters = new HashSet&lt;&gt;();

    public ChatServer(int port) {
        this.port = port;
    }

    public void start() {
        try (ServerSocket serverSocket = new ServerSocket(port)) {
            System.out.println("Chat Server đang chạy ở cổng " + port);
            while (true) {
                new ClientHandler(serverSocket.accept()).start();
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    // Phương thức để phát tin nhắn đến tất cả client
    private synchronized void broadcast(String message) {
        for (PrintWriter writer : clientWriters) {
            writer.println(message);
        }
    }

    // Lớp nội để xử lý từng client riêng biệt
    private class ClientHandler extends Thread {
        private Socket socket;
        private PrintWriter writer;

        public ClientHandler(Socket socket) {
            this.socket = socket;
        }

        public void run() {
            try {
                BufferedReader reader = new BufferedReader(new InputStreamReader(socket.getInputStream()));
                writer = new PrintWriter(socket.getOutputStream(), true);
                
                // Thêm client mới vào danh sách
                synchronized (clientWriters) {
                    clientWriters.add(writer);
                }

                String message;
                while ((message = reader.readLine()) != null) {
                    System.out.println("Đã nhận: " + message);
                    broadcast(message);
                }
            } catch (IOException e) {
                // Lỗi đọc ghi
            } finally {
                // Khi client ngắt kết nối
                if (writer != null) {
                    synchronized (clientWriters) {
                        clientWriters.remove(writer);
                    }
                }
                try {
                    socket.close();
                } catch (IOException e) {}
            }
        }
    }

    public static void main(String[] args) {
        new ChatServer(6868).start();
    }
}</code></pre>

<h4>Mã nguồn phía Client</h4>
<p>Client cần hai luồng: một luồng để gửi dữ liệu người dùng nhập vào, và một luồng khác để nhận và hiển thị tin nhắn từ Server.</p>

<pre><code class="language-java">// File: ChatClient.java
import java.io.*;
import java.net.*;

public class ChatClient {
    public static void main(String[] args) {
        try {
            Socket socket = new Socket("localhost", 6868);
            PrintWriter writer = new PrintWriter(socket.getOutputStream(), true);
            
            // Luồng đọc tin nhắn từ server
            new Thread(() -> {
                try {
                    BufferedReader reader = new BufferedReader(new InputStreamReader(socket.getInputStream()));
                    String serverMessage;
                    while ((serverMessage = reader.readLine()) != null) {
                        System.out.println(serverMessage);
                    }
                } catch (IOException e) {
                    System.out.println("Mất kết nối tới server.");
                }
            }).start();
            
            // Luồng chính đọc input từ console và gửi đi
            BufferedReader consoleReader = new BufferedReader(new InputStreamReader(System.in));
            System.out.print("Nhập tên của bạn: ");
            String name = consoleReader.readLine();
            String userInput;
            while ((userInput = consoleReader.readLine()) != null) {
                writer.println(name + ": " + userInput);
            }
            
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}</code></pre>

<h4>Lời kết</h4>
<p>Dự án này là một minh chứng tuyệt vời cho sức mạnh của việc kết hợp <strong>Socket</strong> và <strong>Đa luồng</strong>. Từ nền tảng này, bạn hoàn toàn có thể mở rộng hệ thống với các tính năng như tin nhắn riêng tư, danh sách người dùng online, hoặc thậm chí là tích hợp giao diện đồ họa thân thiện bằng <strong>JavaFX</strong> hoặc <strong>Swing</strong>.</p>`,
    image: "image/img5.png"
},
    {
    id: 6,
    title: "Fetch API: Cách gửi HTTP Request hiện đại trong JavaScript",
    category: "javascript",
    date: "28/10/2025",
    excerpt: "Kể từ khi JavaScript ES6 ra đời, Fetch API đã trở thành cách chuẩn mực và mạnh mẽ để gửi yêu cầu HTTP. Nó giúp việc tải dữ liệu hoặc gửi thông tin lên server trở nên dễ dàng, linh hoạt và hiện đại hơn nhiều so với $.ajax...",
    content: `<h3>Fetch API: Cách gửi HTTP Request hiện đại trong JavaScript</h3>
<p><strong>Tác giả:</strong> Hieu's Story</p>
<p><strong>Ngày đăng:</strong> 28 tháng 10, 2025</p>
<p><strong>Chuyên mục:</strong> Lập trình mạng JavaScript</p>

<p>Thời còn dùng jQuery, hẳn nhiều bạn đã quen thuộc với <code>\$.ajax</code>. Nhưng kể từ khi JavaScript ES6 ra đời, chúng ta đã có một công cụ mạnh mẽ và hiện đại hơn được tích hợp sẵn trong trình duyệt để làm việc với các yêu cầu mạng: <strong>Fetch API</strong>.</p>

<p>Nếu bạn muốn trang web của mình có thể tải dữ liệu mới, gửi thông tin lên server mà không cần tải lại cả trang, thì Fetch API chính là kỹ năng bạn không thể bỏ qua. Nó sử dụng <strong>Promise</strong> để xử lý các tác vụ bất đồng bộ, giúp code của bạn sạch sẽ và dễ quản lý hơn rất nhiều.</p>

<h4>Yêu cầu GET đầu tiên</h4>
<p>Cách sử dụng cơ bản của <code>fetch</code> là truyền vào URL của tài nguyên bạn muốn lấy. <code>fetch</code> sẽ trả về một <strong>Promise</strong>.</p>

<p>Promise giống như một lời hứa: "Tôi sẽ đi lấy dữ liệu cho bạn, khi có kết quả (thành công hoặc thất bại), tôi sẽ báo lại". Chúng ta dùng phương thức <code>.then()</code> để xử lý khi "lời hứa" được thực hiện.</p>

<p>Hãy thử lấy dữ liệu từ <strong>JSONPlaceholder</strong>:</p>

<pre><code class="language-javascript">console.log("Bắt đầu lấy dữ liệu...");

fetch('https://jsonplaceholder.typicode.com/todos/1')
  .then(response => {
    // response.json() cũng trả về một Promise
    return response.json(); 
  })
  .then(data => {
    // Lúc này chúng ta mới thực sự có dữ liệu
    console.log("Lấy dữ liệu thành công!");
    console.log(data);
  })
  .catch(error => {
    // .catch() được gọi nếu có lỗi trong quá trình fetch
    console.error("Đã có lỗi xảy ra:", error);
  });

console.log("Yêu cầu đã được gửi đi, đang chờ kết quả...");</code></pre>

<p>Nếu bạn mở <strong>Console</strong> của trình duyệt và chạy đoạn mã trên, bạn sẽ thấy các dòng <code>console.log</code> ở đầu và cuối chạy trước, sau đó một lúc dữ liệu mới được in ra. Đó chính là bản chất của <strong>bất đồng bộ</strong>.</p>

<h4>Gửi dữ liệu với yêu cầu POST</h4>
<p>Để gửi dữ liệu, chúng ta cần cung cấp thêm một đối tượng tùy chọn (<em>options</em>) cho <code>fetch</code>, trong đó chỉ định:</p>
<ul>
<li><code>method: 'POST'</code></li>
<li><code>headers</code>: Để server biết chúng ta đang gửi dữ liệu dạng gì (thường là JSON)</li>
<li><code>body</code>: Dữ liệu cần gửi, đã được chuyển thành chuỗi JSON bằng <code>JSON.stringify()</code></li>
</ul>

<pre><code class="language-javascript">const newPost = {
  title: 'Bài viết mới',
  body: 'Nội dung của bài viết',
  userId: 10
};

fetch('https://jsonplaceholder.typicode.com/posts', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(newPost)
})
.then(response => response.json())
.then(data => {
  console.log("Đã tạo bài viết thành công:");
  console.log(data); // Server trả về đối tượng đã được tạo kèm id
})
.catch(error => {
  console.error("Lỗi khi tạo bài viết:", error);
});</code></pre>

<h4>Lời kết</h4>
<p><strong>Fetch API</strong> là một công cụ cực kỳ linh hoạt và mạnh mẽ, là nền tảng cho mọi ứng dụng web động hiện đại. Nắm vững nó, bạn có thể tạo ra những trải nghiệm người dùng mượt mà, tải dữ liệu nền mà không làm gián đoạn họ. Trong bài tiếp theo, chúng ta sẽ tìm hiểu cách làm cho cú pháp này gọn gàng hơn nữa với <strong>async/await</strong>.</p>`,
    image: "image/img6.png"
},
    {
    id: 7,
    title: "Làm chủ Bất đồng bộ trong JavaScript: Từ Callback đến Promise và Async/Await",
    category: "javascript",
    date: "01/11/2025",
    excerpt: "Khi làm việc với các tác vụ mạng trong JavaScript, bạn không thể tránh khỏi khái niệm bất đồng bộ. Từ Callback Hell đến Promise và Async/Await, hành trình này cho thấy sự tiến hóa mạnh mẽ của JavaScript trong xử lý bất đồng bộ...",
    content: `<h3>Làm chủ Bất đồng bộ trong JavaScript: Từ Callback đến Promise và Async/Await</h3>
<p><strong>Tác giả:</strong> Hieu's Story</p>
<p><strong>Ngày đăng:</strong> 01 tháng 11, 2025</p>
<p><strong>Chuyên mục:</strong> Lập trình mạng JavaScript</p>

<p>Khi làm việc với các tác vụ mạng trong JavaScript, có một khái niệm bạn không thể né tránh: <strong>bất đồng bộ (asynchronous)</strong>. Thử tưởng tượng, nếu bạn gửi một yêu cầu lấy dữ liệu và cả trang web bị "đứng hình" cho đến khi có kết quả, trải nghiệm người dùng sẽ tệ đến mức nào!</p>

<p>JavaScript giải quyết vấn đề này bằng cách <em>không chờ đợi</em>. Nó gửi yêu cầu đi và tiếp tục thực hiện các công việc khác. Khi có kết quả, nó sẽ xử lý sau. Theo thời gian, JavaScript đã có nhiều cú pháp khác nhau để quản lý sự bất đồng bộ này. Hãy cùng nhìn lại hành trình đó nhé.</p>

<h4>Thời kỳ đầu: Callback</h4>
<p><strong>Callback</strong> là một hàm được truyền vào một hàm khác như một đối số, và sẽ được gọi khi tác vụ hoàn thành.</p>

<pre><code class="language-javascript">// Đây là code minh họa, không chạy được
function layDuLieu(url, callbackThanhCong, callbackThatBai) {
  // giả lập việc gửi request
  const request = new XMLHttpRequest();
  request.open('GET', url);
  request.onload = function() {
    if (request.status === 200) {
      callbackThanhCong(request.responseText);
    } else {
      callbackThatBai(request.status);
    }
  };
  request.send();
}

// Vấn đề: "Callback Hell"
layDuLieu('api/posts/1', function(post) {
  console.log(post);
  layDuLieu(\`api/users/\${post.userId}\`, function(user) {
    console.log(user);
    layDuLieu(\`api/comments/\${post.id}\`, function(comments) {
      console.log(comments);
      // Cứ thế lồng vào nhau, rất khó đọc và bảo trì
    });
  });
});</code></pre>

<p>Vấn đề lớn nhất của callback là khi có nhiều tác vụ phụ thuộc lẫn nhau, chúng ta sẽ rơi vào <strong>"Callback Hell"</strong> (Địa ngục Callback) với các hàm lồng vào nhau, rất khó đọc và bảo trì.</p>

<h4>Cuộc cách mạng: Promise</h4>
<p><strong>Promise</strong> (Lời hứa) ra đời để giải quyết "Callback Hell". Một Promise đại diện cho kết quả của một tác vụ bất đồng bộ. Nó có ba trạng thái: <em>pending</em> (đang chờ), <em>fulfilled</em> (thành công), <em>rejected</em> (thất bại).</p>

<p>Chúng ta có thể "xếp hàng" các hành động bằng <code>.then()</code> và xử lý lỗi tập trung bằng <code>.catch()</code>.</p>

<pre><code class="language-javascript">fetch('https://jsonplaceholder.typicode.com/posts/1')
  .then(response => response.json())
  .then(post => {
    console.log("Lấy post thành công:", post.title);
    // Trả về một Promise mới
    return fetch(\`https://jsonplaceholder.typicode.com/users/\${post.userId}\`);
  })
  .then(response => response.json())
  .then(user => {
    console.log("Lấy user thành công:", user.name);
  })
  .catch(error => {
    console.error("Đã có lỗi xảy ra trong chuỗi Promise:", error);
  });</code></pre>

<p>Code đã phẳng hơn và dễ đọc hơn rất nhiều!</p>

<h4>Cú pháp tối thượng: Async/Await</h4>
<p><strong>Async/Await</strong> là một lớp “đường cú pháp” (syntactic sugar) bọc bên ngoài Promise, giúp chúng ta viết code bất đồng bộ trông giống như code đồng bộ.</p>

<ul>
<li><strong>async</strong>: Đặt trước một hàm để báo rằng hàm này sẽ chứa các tác vụ bất đồng bộ. Hàm async luôn trả về một Promise.</li>
<li><strong>await</strong>: Chỉ có thể dùng bên trong hàm async. Nó sẽ "tạm dừng" việc thực thi hàm cho đến khi Promise được giải quyết và trả về kết quả.</li>
</ul>

<pre><code class="language-javascript">async function layThongTinPost() {
  try {
    console.log("Bắt đầu thực thi...");
    
    // Tạm dừng ở đây cho đến khi fetch xong
    const postResponse = await fetch('https://jsonplaceholder.typicode.com/posts/1');
    const post = await postResponse.json();
    console.log("Post:", post.title);
    
    // Tiếp tục tạm dừng ở đây
    const userResponse = await fetch(\`https://jsonplaceholder.typicode.com/users/\${post.userId}\`);
    const user = await userResponse.json();
    console.log("Tác giả:", user.name);

    console.log("Hoàn thành!");
  } catch (error) {
    console.error("Xảy ra lỗi trong hàm async:", error);
  }
}

layThongTinPost();</code></pre>

<p>Code bây giờ trông tuần tự, sạch sẽ và cực kỳ dễ hiểu, như thể bạn đang đọc một câu chuyện vậy.</p>

<h4>Lời kết</h4>
<p>Hiểu rõ hành trình từ <strong>Callback</strong> đến <strong>Async/Await</strong> giúp bạn trân trọng hơn cú pháp hiện đại và biết cách xử lý các tình huống bất đồng bộ một cách hiệu quả nhất. Ngày nay, <strong>Async/Await</strong> là tiêu chuẩn vàng khi làm việc với các tác vụ mạng trong JavaScript.</p>`,
    image: "image/img7.png"
},
    {
    id: 8,
    title: "Dự án JS: Xây dựng Ứng dụng Thời tiết sử dụng JavaScript và API công khai",
    category: "javascript",
    date: "05/11/2025",
    excerpt: "Cùng xây dựng một ứng dụng thời tiết đơn giản sử dụng Fetch API, Async/Await và OpenWeatherMap để hiển thị thông tin thời tiết thời gian thực...",
    content: `
Lý thuyết là cần thiết, nhưng cách tốt nhất để củng cố kiến thức chính là thực hành. Hôm nay, chúng ta sẽ cùng nhau xây dựng một dự án nhỏ nhưng cực kỳ thực tế: một ứng dụng web đơn giản để xem thông tin thời tiết của một thành phố bất kỳ.

Dự án này sẽ giúp bạn vận dụng các kỹ năng đã học: làm việc với Fetch API, xử lý Promise bằng Async/Await, và thao tác với DOM để hiển thị dữ liệu lên giao diện. Bắt đầu thôi!

<h3>Bước 1: Lấy API Key</h3>

Để có dữ liệu thời tiết, chúng ta cần sử dụng dịch vụ của một bên thứ ba. Một trong những dịch vụ phổ biến và có gói miễn phí là <strong>OpenWeatherMap</strong>.

1. Truy cập trang <a href="https://openweathermap.org/" target="_blank">OpenWeatherMap</a>.
2. Đăng ký một tài khoản miễn phí.
3. Sau khi đăng nhập, vào mục "API keys" để lấy key của bạn. Hãy lưu lại key này, chúng ta sẽ cần nó ngay sau đây.

<h3>Bước 2: Thiết kế giao diện HTML</h3>

Giao diện của chúng ta rất đơn giản, chỉ cần một ô nhập liệu để người dùng gõ tên thành phố, một nút bấm, và một khu vực để hiển thị kết quả.

<pre><code class="language-html">
<!DOCTYPE html>
<html lang="vi">
<head>
    <meta charset="UTF-8">
    <title>Ứng dụng Thời tiết</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <div class="weather-container">
        <h1>Kiểm tra thời tiết</h1>
        <div class="search-box">
            <input type="text" id="city-input" placeholder="Nhập tên thành phố...">
            <button id="search-btn">Tìm kiếm</button>
        </div>
        <div id="weather-result" class="hidden">
            <h2 id="city-name"></h2>
            <p id="temperature"></p>
            <p id="description"></p>
        </div>
    </div>
    <script src="app.js"></script>
</body>
</html>
</code></pre>

<h3>Bước 3: Viết mã JavaScript</h3>

Đây là phần cốt lõi. Chúng ta sẽ viết một hàm async để gọi API và cập nhật giao diện.

<pre><code class="language-javascript">
// File: app.js
const apiKey = 'API_KEY_CUA_BAN'; // <--- THAY API KEY CỦA BẠN VÀO ĐÂY
const cityInput = document.getElementById('city-input');
const searchBtn = document.getElementById('search-btn');
const weatherResultDiv = document.getElementById('weather-result');

searchBtn.addEventListener('click', () => {
    const cityName = cityInput.value.trim();
    if (cityName) {
        getWeather(cityName);
    }
});

async function getWeather(city) {
    const apiUrl = \`https://api.openweathermap.org/data/2.5/weather?q=\${city}&appid=\${apiKey}&units=metric&lang=vi\`;

    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error('Không tìm thấy thành phố!');
        }
        const data = await response.json();
        displayWeather(data);
    } catch (error) {
        alert(error.message);
    }
}

function displayWeather(data) {
    document.getElementById('city-name').textContent = data.name;
    document.getElementById('temperature').textContent = \`Nhiệt độ: \${data.main.temp}°C\`;
    document.getElementById('description').textContent = \`Mô tả: \${data.weather[0].description}\`;
    
    weatherResultDiv.classList.remove('hidden');
}
</code></pre>

<h3>Lời kết</h3>

Chỉ với một chút HTML và vài chục dòng JavaScript, bạn đã tạo ra một ứng dụng hoàn chỉnh có thể tương tác với một dịch vụ web thực tế. Đây là một ví dụ tuyệt vời cho thấy sức mạnh của API và JavaScript trong việc xây dựng các ứng dụng web động. Bạn có thể thử mở rộng dự án bằng cách thêm icon thời tiết, dự báo cho nhiều ngày, hoặc lưu lại thành phố yêu thích của người dùng.
`,
image: "image/img8.png"
},
    {
    id: 9,
    title: "Tìm hiểu về WebSocket trong JavaScript để Giao tiếp Thời gian thực",
    category: "javascript",
    date: "10/11/2025",
    excerpt: "WebSocket mang đến khả năng giao tiếp hai chiều giữa Client và Server theo thời gian thực, lý tưởng cho ứng dụng chat, game, hay bảng giá chứng khoán.",
    content: `
Chúng ta đã rất quen thuộc với mô hình giao tiếp Client-Server qua HTTP: Client gửi yêu cầu, Server trả về phản hồi. Mô hình này hoạt động rất tốt cho việc duyệt web hay gọi API. Nhưng nếu bạn muốn xây dựng các ứng dụng cần cập nhật dữ liệu liên tục, theo thời gian thực như ứng dụng chat, bảng chứng khoán trực tuyến, hay thông báo đẩy thì sao? Việc Client phải liên tục gửi yêu cầu (polling) để hỏi "Có gì mới không?" là cực kỳ lãng phí tài nguyên.

Đây là lúc <strong>WebSocket</strong> tỏa sáng. Nó tạo ra một kênh giao tiếp hai chiều và bền bỉ giữa Client và Server, cho phép Server có thể chủ động đẩy dữ liệu xuống cho Client bất cứ lúc nào.

<h3>WebSocket khác HTTP như thế nào?</h3>

<strong>HTTP/HTTPS</strong>: Là giao thức một chiều (request-response). Mỗi yêu cầu là một kết nối riêng biệt (hoặc được tái sử dụng ngắn hạn). Server không thể tự ý gửi dữ liệu cho client.<br>
<strong>WebSocket (Giao thức ws:// hoặc wss://)</strong>: Sau một "cái bắt tay" ban đầu qua HTTP, kết nối sẽ được "nâng cấp" thành một kết nối WebSocket. Kết nối này được giữ mở, cho phép cả Client và Server đều có thể gửi dữ liệu cho nhau bất cứ lúc nào mà không cần yêu cầu mới.

<h3>Sử dụng WebSocket ở phía Client (JavaScript)</h3>

API WebSocket trong trình duyệt rất đơn giản và dễ sử dụng.

<pre><code class="language-javascript">
// Tạo một kết nối WebSocket mới
// Bạn cần một server WebSocket đang chạy ở địa chỉ này
const socket = new WebSocket('wss://echo.websocket.events');

// Sự kiện được kích hoạt khi kết nối được mở thành công
socket.onopen = function(event) {
  console.log("Đã kết nối tới WebSocket Server!");
  // Gửi một tin nhắn đến server
  socket.send("Xin chào Server, tôi là Client!");
};

// Sự kiện được kích hoạt khi nhận được tin nhắn từ server
socket.onmessage = function(event) {
  console.log("Nhận từ Server: ", event.data);
};

// Sự kiện được kích hoạt khi có lỗi xảy ra
socket.onerror = function(error) {
  console.error("Lỗi WebSocket: ", error);
};

// Sự kiện được kích hoạt khi kết nối bị đóng
socket.onclose = function(event) {
  console.log("Đã ngắt kết nối.");
  if (event.wasClean) {
    console.log(\`Kết nối đóng một cách sạch sẽ, code=\${event.code}, reason=\${event.reason}\`);
  } else {
    // ví dụ: server bị sập
    console.log('Kết nối bị ngắt đột ngột');
  }
};
</code></pre>

Để thử nghiệm nhanh, bạn có thể dùng <code>wss://echo.websocket.events</code>, một dịch vụ công khai sẽ gửi lại bất cứ thứ gì bạn gửi cho nó.

<h3>Khi nào nên dùng WebSocket?</h3>

WebSocket là lựa chọn lý tưởng cho các ứng dụng yêu cầu độ trễ thấp và cập nhật dữ liệu theo thời gian thực, ví dụ:

- Ứng dụng Chat: Gửi và nhận tin nhắn ngay lập tức.<br>
- Game online nhiều người chơi: Cập nhật vị trí, hành động của người chơi khác.<br>
- Ứng dụng tài chính: Hiển thị giá cổ phiếu, tiền điện tử biến động liên tục.<br>
- Thông báo (Notifications): Server đẩy thông báo mới xuống cho người dùng.<br>
- Công cụ cộng tác trực tuyến (như Google Docs): Cập nhật thay đổi của người khác trong thời gian thực.

<h3>Lời kết</h3>

WebSocket đã mở ra một kỷ nguyên mới cho các ứng dụng web thời gian thực. Bằng cách cung cấp một kênh giao tiếp hai chiều hiệu quả, nó giúp các nhà phát triển xây dựng những trải nghiệm tương tác và sống động hơn bao giờ hết. Mặc dù việc xây dựng một WebSocket Server (ví dụ: bằng Node.js với thư viện ws hoặc Socket.IO) phức tạp hơn phía client, nhưng việc hiểu rõ cách nó hoạt động sẽ mang lại cho bạn một lợi thế rất lớn.
`,
image: "image/img9.png"
}
];

// Khởi chạy ứng dụng
document.addEventListener('DOMContentLoaded', () => {
    initializeAppBlog();
});

function initializeAppBlog() {
    renderBlogPosts();
    initializeFilters();
    initializeCardAnimations(); // Thêm hàm này để chạy hiệu ứng
}

// ===== HIỂN THỊ CÁC BÀI VIẾT BLOG =====
function renderBlogPosts() {
    const container = document.getElementById('blog-container');
    if (!container) return;
    container.innerHTML = '';

    blogPosts.forEach(post => {
        const card = createBlogCard(post);
        container.appendChild(card);
    });
}

function createBlogCard(post) {
    const card = document.createElement('div');
    card.className = 'blog-card';
    card.setAttribute('data-category', post.category);

    card.innerHTML = `
        <img src="${post.image}" alt="${post.title}" class="blog-image">
        <div class="blog-content">
            <span class="blog-category">${post.category.toUpperCase()}</span>
            <h3>${post.title}</h3>
            <div class="blog-date">📅 ${post.date}</div>
            <p class="blog-excerpt">${post.excerpt}</p>
            <a href="#" class="read-more">Đọc tiếp →</a>
        </div>
    `;

    // Cải tiến: Nhấp vào bất kỳ đâu trên thẻ cũng sẽ mở bài viết
    card.addEventListener('click', (e) => {
        e.preventDefault(); // Ngăn hành vi mặc định của thẻ <a>
        showPostDetail(post);
    });

    return card;
}


// ===== CHỨC NĂNG LỌC BÀI VIẾT =====
function initializeFilters() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            const filter = btn.getAttribute('data-filter');
            filterPosts(filter);
        });
    });
}

function filterPosts(category) {
    const blogContainer = document.getElementById('blog-container');
    const certificatesContainer = document.getElementById('certificates-container');
    const blogCards = blogContainer.querySelectorAll('.blog-card');

    // --- BẮT ĐẦU SỬA ---

    // 1. Điều khiển việc hiển thị của các container chính
    if (category === 'all') {
        // Nếu là 'Tất Cả', hiển thị CẢ blog VÀ chứng chỉ
        blogContainer.style.display = 'grid';
        certificatesContainer.style.display = 'grid';
    } else if (category === 'certificates') {
        // Nếu là 'Chứng chỉ', chỉ hiển thị chứng chỉ
        blogContainer.style.display = 'none';
        certificatesContainer.style.display = 'grid';
    } else {
        // Nếu là 'Java' hoặc 'JavaScript', chỉ hiển thị blog
        blogContainer.style.display = 'grid';
        certificatesContainer.style.display = 'none';
    }

    // 2. Lọc các thẻ bài viết blog bên trong blogContainer
    // Logic này vẫn chạy đúng cho mọi trường hợp
    blogCards.forEach(card => {
        const cardCategory = card.getAttribute('data-category');
        if (category === 'all' || cardCategory === category) {
            // Hiển thị thẻ nếu:
            // 1. Đang chọn 'Tất Cả'
            // 2. Thẻ có category trùng với category đang chọn
            card.style.display = 'block';
        } else {
            // Ẩn thẻ đi
            card.style.display = 'none';
        }
    });
}

// ===== HIỆU ỨNG THẺ KHI CUỘN (Sao chép từ script.js) =====
function initializeCardAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.blog-card, .certificate-card').forEach(el => { // Cập nhật để lấy cả certificate-card
        el.style.opacity = '0'; // Đảm bảo thẻ ẩn ban đầu để hiệu ứng hoạt động
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// ===== HIỂN THỊ CHI TIẾT BÀI VIẾT (MODAL) =====
function showPostDetail(post) {
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.innerHTML = `
        <div class="modal-content">
            <span class="modal-close">&times;</span>
            <img src="${post.image}" alt="${post.title}" style="width: 100%; max-height: 300px; object-fit: cover; border-radius: 10px; margin-bottom: 1.5rem;">
            <div class="modal-body">
                 ${post.content}
            </div>
        </div>
    `;

    // Thêm CSS cho modal nếu chưa có
    if (!document.querySelector('style[data-modal]')) {
        const style = document.createElement('style');
        style.setAttribute('data-modal', 'true');
        style.textContent = `
            .modal {
                display: flex;
                position: fixed;
                z-index: 2000;
                left: 0;
                top: 0;
                width: 100%;
                height: 100%;
                overflow: auto;
                background-color: rgba(0, 0, 0, 0.7);
                align-items: center;
                justify-content: center;
                animation: fadeIn 0.3s ease;
            }
            @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
            .modal-content {
                background-color: white;
                padding: 2rem;
                border-radius: 10px;
                width: 90%;
                max-width: 800px;
                max-height: 90vh;
                overflow-y: auto;
                position: relative;
                animation: slideUp 0.3s ease;
            }
            @keyframes slideUp { from { transform: translateY(50px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
            .modal-close {
                color: #aaa;
                position: absolute;
                right: 1.5rem;
                top: 1rem;
                font-size: 2rem;
                font-weight: bold;
                cursor: pointer;
                transition: color 0.3s;
            }
            .modal-close:hover { color: #e74c3c; }
            .modal-body h3, .modal-body h4 { margin-top: 1.5rem; margin-bottom: 0.5rem; color: #2c3e50; }
            .modal-body p { line-height: 1.8; color: #333; }
            .modal-body pre { background: #f4f4f4; padding: 1rem; border-radius: 5px; overflow-x: auto; margin: 1rem 0; }
            .modal-body code { font-family: 'Courier New', monospace; }
        `;
        document.head.appendChild(style);
    }

    document.body.appendChild(modal);
    document.body.style.overflow = 'hidden'; // Ngăn cuộn trang nền

    // Chức năng đóng modal
    const closeModal = () => {
        modal.remove();
        document.body.style.overflow = 'auto';
    };

    modal.querySelector('.modal-close').addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeModal();
        }
    }, { once: true });
}
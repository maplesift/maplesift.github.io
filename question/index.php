<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>question</title>
    <style>
        body {
            padding: 5px;
            box-sizing: border-box;
        }

        table {
            width: 100%;
            border-collapse: collapse;
            margin: 20px 0;
            font-family: Arial, sans-serif;
        }

        th,
        td {
            border: 1px solid #ddd;
            padding: 12px;
            text-align: left;
        }

        th {
            font-weight: bold;
        }

        caption {
            font-size: 1.1em;
            font-weight: bold;
            padding: 10px;
        }
    </style>
</head>

<body>
    <h3>
        1.用 PHP 實作一個計算 Fibonacci number的 Function
        <br>例如： fib(6) 的結果為 8
        <br>請用 Recursive 及 非 Recursive 的方式各作一次。
    </h3>

    <br>答案:
    <?php
    // 	Recursive
    function fib_recursive($n)
    {
        if ($n == 0) return 0;
        if ($n == 1) return 1;
        return fib_recursive($n - 1) + fib_recursive($n - 2);
    }

    for ($i = 0; $i < 10; $i++) {
        echo fib_recursive($i) . " ";
    }

    // iterative
    function fib_iterative($n)
    {
        if ($n == 0) return 0;
        if ($n == 1) return 1;

        $a = 0;
        $b = 1;

        for ($i = 2; $i <= $n; $i++) {
            $tmp = $a + $b;
            $a = $b;
            $b = $tmp;
        }
        return $b;
    }

    for ($i = 0; $i < 10; $i++) {
        echo fib_iterative($i) . " ";
    }

    ?>
    <br>
    <hr>
    <h3>

        2. 給定一個 PHP array, 例如：
        <br>data = [ 10, 20, 50, 7, 9, ];
        <br>寫一個函數計算該 array 的中位數。
    </h3>
    <br>答案:
    <?php

    function find_median($data)
    {
        // 排序
        sort($data);
        // 取得陣列長度
        $count = count($data);

        // 奇數
        if ($count % 2 != 0) {
            return $data[floor($count / 2)];
        }

        // 偶數
        $middle1 = $data[($count / 2) - 1];
        $middle2 = $data[$count / 2];
        return ($middle1 + $middle2) / 2;
    }

    $data = [10, 20, 50, 7, 9];
    echo "中位數是: " . find_median($data);
    ?>
    <br>
    <hr>
    <h3>

        <br>3.如何用 PHP 指令產生：
        <br>昨天下午3:00 的 timestamp
        <br>上星期二早上8:00 的 timestamp
        <br>2016/11/11 早上10:30 的 timestamp
    </h3>

    <br>答案:
    <br>
    <?php
    date_default_timezone_set('Asia/Taipei');
    // 1. 昨天下午3:00 的 timestamp
    $yesterday_3pm = strtotime("yesterday 15:00");
    echo "昨天下午3:00 的 timestamp: $yesterday_3pm <br>";

    // 2. 上星期二早上8:00 的 timestamp
    $last_tuesday_8am = strtotime("last Tuesday 08:00");
    echo "上星期二早上8:00 的 timestamp: $last_tuesday_8am<br>";

    // 3. 2016/11/11 早上10:30 的 timestamp
    $date_20161111_1030 = strtotime("2016-11-11 10:30");
    echo "2016/11/11 早上10:30 的 timestamp: $date_20161111_1030<br>";
    ?>
<hr>
    <h3>4. 在 Web application 的環境下，請問 Cookie 功用是什麼？請列舉一個例子說明之。</h3>

    在 Web 應用程式環境中，Cookie 是一種由伺服器傳送到用戶瀏覽器並儲存在用戶端的小型文字檔案，用於儲存特定資訊以實現狀態管理、個人化或其他功能。其主要功用包括：
    <br>1.狀態管理：HTTP 是無狀態協議，Cookie 可儲存用戶的會話資訊（如登入狀態），讓伺服器辨識用戶。
    <br>2.個人化：記錄用戶的偏好設定，如語言選擇或主題樣式。
    <br>3.追蹤與分析：用於記錄用戶行為，例如廣告追蹤或網站分析。
    <br>4.功能性：儲存臨時數據，如購物車內容。
    <br>
    <br>補充:session

    <br>1.儲存用戶狀態：Session 在伺服器端維護用戶的會話資訊（如登入狀態、購物車內容）。
    <br>2.安全性：相較於 Cookie（儲存在客戶端，易被篡改），Session 數據儲存在伺服器端，客戶端僅持有一個唯一標識（Session ID），較安全。
    <br>3.臨時數據管理：適合儲存臨時或敏感數據，會話結束或過期後自動清除。
    <br>4.跨頁面數據共享：允許用戶在網站的不同頁面間共享數據。

    <h4>例子:</h4>
    用戶輸入帳號密碼並成功登入後，伺服器創建一個 Session 物件，儲存用戶資訊（如用戶 ID、角色）。
    <br>伺服器生成一個唯一的 Session ID（例如 abc123），並將其儲存在 Cookie 中（名稱通常為 session_id=abc123）發送給瀏覽器。
    <br>用戶瀏覽論壇的不同頁面時，瀏覽器每次請求都會帶上該 Cookie，伺服器根據 abc123 查找對應的 Session 數據，確認用戶已登入並顯示個人化內容（如用戶名稱或發帖記錄）。
    <br>當用戶登出或 Session 過期（例如 30 分鐘無活動），伺服器銷毀該 Session，確保安全性。
    <hr>
    <h3>
        5. 請說明 HTTP/2 和 HTTP/1.1 有何不同？
        <br>HTTP/2 最主要是要改善什麼問題
        <br>並簡單描述 HTTP/2 是怎麼達到這個目的。
    </h3>
    <table>
        <caption>HTTP/1.1 與 HTTP/2 比較</caption>
        <tr>
            <th>特性</th>
            <th>HTTP/1.1</th>
            <th>HTTP/2</th>
        </tr>
        <tr>
            <td>多路複用 (Multiplexing)</td>
            <td>每個請求需要獨立的 TCP 連接，或在 Keep-Alive 下串行處理，導致隊頭阻塞 (Head-of-Line Blocking)。</td>
            <td>在單一 TCP 連接上並行傳輸多個數據流，無需等待其他請求完成，解決隊頭阻塞問題。</td>
        </tr>
        <tr>
            <td>二進制分幀 (Binary Framing)</td>
            <td>使用純文本傳輸，解析效率較低。</td>
            <td>採用二進制格式，將數據分割成小幀，提高解析效率和傳輸靈活性。</td>
        </tr>
        <tr>
            <td>頭部壓縮 (Header Compression)</td>
            <td>每次請求都傳送完整頭部，包含重複數據，增加開銷。</td>
            <td>使用 HPACK 壓縮頭部，減少重複數據，提升效率。</td>
        </tr>
        <tr>
            <td>服務器推送 (Server Push)</td>
            <td>客戶端需明確請求每個資源。</td>
            <td>服務器可主動推送客戶端可能需要的資源（如 CSS、JS），減少延遲。</td>
        </tr>
        <tr>
            <td>流量控制與優先級</td>
            <td>無內建優先級機制，資源載入順序難以控制。</td>
            <td>支援數據流優先級與流量控制，優化資源分配。</td>
        </tr>
    </table>
    <h4>
        HTTP/2 主要改善的問題
    </h4>
HTTP/2 主要針對 HTTP/1.1 的性能瓶頸，特別是高延遲和隊頭阻塞問題，這些問題在高流量、資源密集的網站上尤為明顯。
HTTP/1.1 的串行請求和重複頭部數據導致頁面載入速度慢，影響用戶體驗。
<h4>

    HTTP/2 如何達成目標
</h4>
1.多路複用：允許多個請求和響應並行傳輸，減少等待時間，提升頁面載入速度。
<br>2.頭部壓縮：減少頭部數據量，降低帶寬使用，特別適合行動網絡。
<br>3.服務器推送：預先傳送資源，減少客戶端請求次數，加快頁面渲染。
<br>4.二進制分幀：提高數據處理效率，減少解析錯誤。
<hr>
    <h3>
        6. 在資料庫中，Primary key、Unique key、Foreign key有什麼不同？並描述在什麼情況下應該要使用什麼key。
    </h3>
    <table >
        <thead>
            <tr>
                <th>特性</th>
                <th>Primary Key (主鍵)</th>
                <th>Unique Key (唯一鍵)</th>
                <th>Foreign Key (外鍵)</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td><strong>唯一性</strong></td>
                <td>必須唯一</td>
                <td>必須唯一</td>
                <td>不要求唯一</td>
            </tr>
            <tr>
                <td><strong>允許空值</strong></td>
                <td>不允許（NOT NULL）</td>
                <td>允許（通常一個空值）</td>
                <td>允許（視情況而定）</td>
            </tr>
            <tr>
                <td><strong>數量限制</strong></td>
                <td>一個資料表只能有一個</td>
                <td>一個資料表可有多個</td>
                <td>一個資料表可有多個</td>
            </tr>
            <tr>
                <td><strong>用途</strong></td>
                <td>唯一識別記錄</td>
                <td>確保欄位值唯一</td>
                <td>建立資料表間關聯</td>
            </tr>
            <tr>
                <td><strong>索引</strong></td>
                <td>自動建立唯一索引</td>
                <td>自動建立唯一索引</td>
                <td>通常自動建立索引（視 DBMS）</td>
            </tr>
            <tr>
                <td><strong>範例</strong></td>
                <td><code>user_id in users</code></td>
                <td><code>email in users</code></td>
                <td><code>user_id in orders</code></td>
            </tr>
        </tbody>
    </table>
    <hr>
<h3>
7. 在資料庫中，ACID分別代表什麼意思？如果不符合ACID會造成什麼問題？
</h3>
<br>ACID 是一個縮寫，代表以下四個特性，確保資料庫交易（transaction）的可靠性和一致性：
<h4>
    Atomicity（原子性）：
</h4>

交易中的所有操作要嘛全部成功執行，要嘛全部失敗並回滾（rollback）。不會出現部分執行的情況。
<br>例子：轉帳時，從A帳戶扣款和B帳戶加款必須同時完成，若其中一步失敗，則整個交易取消。
<h4>
    Consistency（一致性）：
</h4>

交易完成後，資料庫必須從一個一致的狀態轉移到另一個一致的狀態，遵守所有定義的規則、約束（如主鍵唯一、資料完整性等）。
<br>例子：確保帳戶餘額不會變成負值（若有此限制）。
<h4>
    Isolation（隔離性）：
</h4>
交易在執行過程中，彼此之間是隔離的，未完成的交易不會影響其他交易的執行結果。
<br>例子：即使多個用戶同時進行轉帳，交易結果不會互相干擾。
<h4>
Durability（持久性）：
</h4>
一旦交易提交（commit），其結果會永久保存，即使系統發生故障（如斷電），資料也不會丟失。
<br>例子：轉帳完成後，資料會寫入硬碟，系統崩潰後仍可恢復。
<br>如果不符合ACID會造成的問題
<h3>
    若資料庫系統無法保證ACID特性，可能導致以下問題：
</h3>
<h4>
    違反原子性（Non-Atomicity）：
</h4>
交易中途失敗但部分操作已執行，可能導致資料不一致。
<br>例子：轉帳時A帳戶扣款成功，但B帳戶未收到款項，造成資金損失或資料錯誤。
<h4>
    違反一致性（Non-Consistency）：
</h4>
資料庫可能違反約束條件（如主鍵重複、餘額變負），導致資料不可靠。
<br>例子：允許帳戶餘額變成負值，違反業務邏輯。
<h4>
    違反隔離性（Non-Isolation）：
</h4>
並行交易互相干擾，可能出現「髒讀」（dirty read）、「不可重複讀」（non-repeatable read）或「幻讀」（phantom read）等問題。
<br>例子：一個交易讀到另一個未提交交易的資料，若後者回滾，則前者使用的資料無效。
<h4>
    違反持久性（Non-Durability）：
</h4>
交易提交後，資料未正確儲存，系統故障時資料丟失。
<br>例子：轉帳完成後資料僅存於記憶體，系統崩潰後交易記錄消失。
</body>

</html>
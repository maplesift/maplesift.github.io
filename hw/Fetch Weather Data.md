## 天氣查詢系統

這個系統允許用戶選擇地區來查看當前的天氣資訊，使用台灣氣象局的開放資料 API。

### **HTML 結構**
```html
<select id="locationSelect">
    <option value="">請選擇地區</option>
</select>

<table id="myTable">
    <thead>
        <tr>
            <th>地區</th>
            <th>溫度</th>
            <th>降雨機率</th>
            <th>舒適度</th>
            <th>時間</th>
        </tr>
    </thead>
    <tbody></tbody>
</table>

<script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
<script>
    let locationsData = []; // 儲存所有地區的氣象資料

    function fetchTemperature() {
        const myTable = $('#myTable');
        const myTbody = myTable.find('tbody');
        const locationSelect = $('#locationSelect');
        let url1 = `https://opendata.cwa.gov.tw/api/v1/rest/datastore/F-D0047-069?Authorization=${pwd}`;

        $.ajax({
            type: "get",
            url: url1,
            dataType: "json",
            success: function (res) {
                let Locations = res.records.Locations[0];
                locationsData = Locations.Location; // 儲存所有地區

                // 清空 select 選單
                locationSelect.empty().append('<option value="">請選擇地區</option>');

                // 將所有地區名稱加入 <select>
                locationsData.forEach((location, index) => {
                    locationSelect.append(`<option value="${index}">${location.LocationName}</option>`);
                });

                console.log("地區列表已更新");
            }
        });
    }

    // 監聽地區選擇變更
    $('#locationSelect').on('change', function () {
        let selectedIndex = $(this).val();
        if (selectedIndex === "") return; // 如果沒有選擇地區則不執行

        const myTbody = $('#myTable tbody');
        myTbody.empty(); // 清空表格

        let data = locationsData[selectedIndex];
        let WeatherElement = data.WeatherElement;
        let Temperature = WeatherElement[0].Time[0].ElementValue[0].Temperature;
        let ProbabilityOfPrecipitation = WeatherElement[7].Time[0].ElementValue[0].ProbabilityOfPrecipitation;
        let ComfortIndexDescription = WeatherElement[4].Time[0].ElementValue[0].ComfortIndexDescription;
        let DataTime = WeatherElement[0].Time[0].DataTime;

        let tmp = `
            <tr>
                <td>${data.LocationName}</td>
                <td>${Temperature}°C</td>
                <td>${ProbabilityOfPrecipitation}%</td>
                <td>${ComfortIndexDescription}</td>
                <td>${DataTime}</td>
            </tr>
        `;
        myTbody.append(tmp);
    });

    // 執行 API 請求
    fetchTemperature();
</script>

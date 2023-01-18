export default {
  // navbar数据
  navbarData: [
    {
      channel: 1,
      hd_sensor_type_id: "40289aa56c092020016c09250e2f0000",
      unit: "mg/L",
      name: "溶解氧",
      id: "ff8080817e000205017e0a9da7f5039a",
      value: "9.1"
    },
    {
      sta: 1,
      hd_sensor_type_small_image_path:
        "/picture/iot/upload/sensor/2020-03-21/b2c843bb-bf26-44e3-aec3-34397c884981.png",
      code: "2",
      channel: 2,
      channelType: 5,
      hd_sensor_type_id: "40289aa56c092020016c092586380001",
      type: null,
      subgroup_name: null,
      subgroup_code: null,
      system_response_time: 1645578730000,
      unit: "℃",
      function_code: null,
      image_path:
        "/picture/iot/upload/sensor/2020-03-21/ad923e30-35df-456f-8821-226c62ba7d5f.png",
      name: "水温",
      id: "ff8080817e000205017e0a9da800039b",
      rs_facilities_id: "ff8080817be90d1a017c21197e4607a8",
      hd_sensor_type_image_path:
        "/picture/iot/upload/sensor/2020-03-21/ad923e30-35df-456f-8821-226c62ba7d5f.png",
      value: "9.8",
      hd_sensor_type_function_id: "2_WATER"
    },
    {
      sta: 1,
      hd_sensor_type_small_image_path:
        "/picture/iot/upload/sensor/2020-03-21/0736c070-5198-4f0b-806a-2fe8f0f34932.png",
      code: "3",
      channel: 3,
      channelType: 5,
      hd_sensor_type_id: "40289aa56c092020016c0925e9320002",
      type: null,
      subgroup_name: null,
      subgroup_code: null,
      system_response_time: 1645578730000,
      unit: "",
      function_code: null,
      image_path:
        "/picture/iot/upload/sensor/2020-03-21/2cc541b6-8122-4dfa-bc12-3f55df1a453d.png",
      name: "pH值",
      id: "ff8080817e000205017e0a9da806039c",
      rs_facilities_id: "ff8080817be90d1a017c21197e4607a8",
      hd_sensor_type_image_path:
        "/picture/iot/upload/sensor/2020-03-21/2cc541b6-8122-4dfa-bc12-3f55df1a453d.png",
      value: "5.2",
      hd_sensor_type_function_id: "3_WATER"
    },
    {
      sta: 1,
      hd_sensor_type_small_image_path:
        "/picture/iot/upload/sensor/2020-03-21/0736c070-5198-4f0b-806a-2fe8f0f34932.png",
      code: "3",
      channel: 7,
      unit: "m",
      name: "水位",
      id: "ff8080817e000205017e0a9da806039c",
      value: "0.92"
    }
  ],

  //echarts图数据
  echartsData: [
    {
      response_timestamps: [
        1645545600,
        1645459200,
        1645372800,
        1645286400,
        1645200000,
        1645113600,
        1645027200
      ],
      wsenValue1: [9.2, 9.02, 9.12, 9.21, 8.4, 7.2, 7.28],
      response_times: [
        "2022-02-23",
        "2022-02-22",
        "2022-02-21",
        "2022-02-20",
        "2022-02-19",
        "2022-02-18",
        "2022-02-17"
      ],
      wsenValue2: [9.56, 10.61, 9.51, 9.15, 13, 20.6, 20.18],
      wsenValue3: [5.26, 5.29, 5.36, 5.41, 5.34, 5.21, 5.29]
    },
    {
      response_timestamps: [
        1645545600,
        1645459200,
        1645372800,
        1645286400,
        1645200000,
        1645113600,
        1645027200
      ],
      response_times: [
        "2022-02-23",
        "2022-02-22",
        "2022-02-21",
        "2022-02-20",
        "2022-02-19",
        "2022-02-18",
        "2022-02-17"
      ],
      wsenValue7: [1.04, 1.05, 1.12, 1.21, 1.15, 1.03, null]
    }
  ]
};

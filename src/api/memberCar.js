import request from "@/utils/request";

export default {
  getUserMemberList(searchModel) {
    // 确保 searchModel.search_key 不是空对象
    // if (Object.keys(searchModel.search_key).length === 0) {
    //   searchModel.search_key = { status: 1 }
    // }
    const encodedSearchKey = searchModel.search_key;
    const params = JSON.stringify({
      page: searchModel.page,
      pageSize: searchModel.pageSize,
      search_key: encodedSearchKey,
    });
    console.log(params);
    // 创建 URLSearchParams 对象并设置参数
    // const params = new URLSearchParams();
    // params.append('page', searchModel.page);
    // params.append('pageSize', searchModel.pageSize);
    // params.append('search_key', JSON.stringify(searchModel.search_key));
    return request({
      url: "/user/pageListMember",
      method: "post",
      headers: {
        // 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
        "Content-Type": "application/json",
      },
      data: params,
      // params
    });
  },
  // 会员车辆进出记录
  getCarInOutRecord(searchModel) {
    const encodedSearchKey = searchModel.search_key;
    const params = JSON.stringify({
      page: searchModel.page,
      pageSize: searchModel.pageSize,
      search_key: {
        plate_number: encodedSearchKey.plate_number,
        car_in_at: encodedSearchKey.car_in_at,
        car_in_equip_name: encodedSearchKey.car_in_equip_name,
        car_out_at: encodedSearchKey.car_out_at,
        car_out_equip_name: encodedSearchKey.car_out_equip_name,
        car_out_manual_memo: encodedSearchKey.car_out_manual_memo,
        //
        member_id:
          Number(encodedSearchKey.member_id) === 0
            ? null
            : Number(encodedSearchKey.member_id),
        openid: encodedSearchKey.openid,
        openid_mp: encodedSearchKey.openid_mp,
        mobile: encodedSearchKey.mobile,
        name: encodedSearchKey.name,
        sex: encodedSearchKey.sex,
        check_car_out: encodedSearchKey.check_car_out
          ? encodedSearchKey.check_car_out
          : 0,
      },
      // ...encodedSearchKey
    });
    console.log(params);
    return request({
      url: "/user/pageListMemberCarInOutRecord",
      method: "post",
      // data: {
      //   page: params.page,
      //   pageSize: params.pageSize,
      //   member_id: params.member_id,
      //   plate_number: params.plate_number,
      //   car_in_at: params.car_in_at,
      //   car_out_at: params.car_out_at,
      // }
      data: params,
      headers: {
        // 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
        "Content-Type": "application/json",
      },
    });
  },
  // 用户管理 分页列表
  // export function userPageList(data) {
  //   return request({
  //     url: '/user/pageList',
  //     method: 'post',
  //     data
  //   })
  // },

  // 更新会员状态
  updateMemberStatus(user) {
    return request({
      url: "/user/updateMemberStatus",
      method: "post",
      data: { status: user.status, member_id: user.id },
    });
  },
  // 更新会员免费停车有效期  updateMemberFreeParking
  updateUser(user) {
    return request({
      url: '/user/updateMemberFreeParking',
      method: 'post',
      data: { free_parking_expire_at: user.free_parking_expire_at, member_id: user.id }
    });
  },
  // 分页列表，会员
  // /api/user/pageListMember
  getUserMemberPageList(searchModel) {
    return request({
      url: "/user/pageListMember",
      method: "post",
      params: {
        page: searchModel.page,
        pageSize: searchModel.pageSize,
        status: searchModel.status,
        sex: searchModel.sex,
        mobile: searchModel.mobile,
        member_car_plate_number: searchModel.member_car_plate_number,
      },
    });
  },
  //
  getCarList(member_id) {
    return request({
      url: "/user/listMemberCarLog",
      method: "post",
      data: { member_id },
    });
  },

  // 更新手动出场
  updateMemberCarOutManual(user) {
    return request({
      url: "/user/updateMemberCarOutManual",
      method: "post",
      data: { car_out_at: user.car_out_at, id: user.id, memo: user.memo },
    });
  },

  saveUser(user) {
    // if(user.id == null && user.id == undefined){
    //   return this.addUser(user);
    // }
    // 添加
    // if (!user.id) {
    //   return this.addUser(user);
    // }
    return this.updateUser(user);
  },
};

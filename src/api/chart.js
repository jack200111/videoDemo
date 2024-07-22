import request from '@/utils/request'

export default {
  // 会员分析
  getChartMember(begin_at, end_at) {
    return request({
      url: '/user/statistic/member',
      method: 'post',
      data: { begin_at, end_at }
    });
  },
  // 出入口
  getChartInout(begin_at, end_at) {
    return request({
      url: '/user/statistic/car/inOutEquip',
      method: 'post',
      data: { begin_at, end_at }
    });
  },
  // 24小时
  getChartInOutHour(input_time) {
    return request({
      url: '/user/statistic/car/inOutHour',
      method: 'post',
      data: { input_time }
    });
  },
  // 30日
  getChartInOutDay(input_time) {
    return request({
      url: '/user/statistic/car/inOutDay',
      method: 'post',
      data: { input_time }
    });
  },
  // 30日会员
  getChartMemberRegisterMonth(input_time) {
    return request({
      url: '/user/statistic/member/memberRegisterMonth',
      method: 'post',
      data: { input_time }
    });
  },
  // 30日
  getChartStayTime(begin_at, end_at) {
    return request({
      url: '/user/statistic/car/stayTime',
      method: 'post',
      data: { begin_at, end_at }
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
        //
        member_id: Number(encodedSearchKey.member_id) === 0 ? null : Number(encodedSearchKey.member_id),
        openid: encodedSearchKey.openid,
        mobile: encodedSearchKey.mobile,
        name: encodedSearchKey.name,
        sex: encodedSearchKey.sex,
      }
      // ...encodedSearchKey
    })
    console.log(params);
    return request({
      url: '/user/pageListMemberCarInOutRecord',
      method: 'post',
      data: params,
      headers: {
        // 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
        'Content-Type': 'application/json'
      },
    });
  },
  // 分页列表，会员
  // /api/user/pageListMember
  getUserMemberPageList(searchModel) {
    return request({
      url: '/user/pageListMember',
      method: 'post',
      params: {
        page: searchModel.page,
        pageSize: searchModel.pageSize,
        status: searchModel.status,
        sex: searchModel.sex,
        mobile: searchModel.mobile,
        member_car_plate_number: searchModel.member_car_plate_number
      }
    });
  },

  addUser(user) {
    return request({
      url: '/user/add',
      method: 'post',
      data: user
    });
  },
  // 更新会员状态
  updateMemberStatus(user) {
    return request({
      url: '/user/updateMemberStatus',
      method: 'post',
      data: { status: user.status, member_id: user.id }
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
}

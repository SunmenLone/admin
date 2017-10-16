package com.jybl.admin.service.provider;

import com.jybl.admin.entity.ServiceEntity;
import org.apache.ibatis.jdbc.SQL;

public class ServiceProvider {

    public String selectService(ServiceEntity serviceEntity, Long first, Long limit) {

        StringBuffer sb = new StringBuffer();
        sb.append("SELECT * FROM SERVICE WHERE 1=1");
        if (serviceEntity.getStatus() != null && serviceEntity.getStatus().length() > 0) {
            sb.append(" AND STATUS=" + serviceEntity.getStatus());
        }
        if (serviceEntity.getName() != null && serviceEntity.getName().length() > 0) {
            sb.append(" AND NAME LIKE '%" + serviceEntity.getName() + "%'");
        }
        sb.append(" LIMIT " + first.toString() + ", " + limit.toString());

        return sb.toString();

    }

    public String updateService(ServiceEntity serviceEntity) {
        return new SQL(){
            {
                UPDATE("SERVICE");

                if (serviceEntity.getName() != null) {
                    SET("name = #{name}");
                }

                if (serviceEntity.getContent() != null) {
                    SET("content = #{content}");
                }

                if (serviceEntity.getRiskLevelId() != null) {
                    SET("risk_level_id = #{riskLevelId}");
                }

                if (serviceEntity.getKind() != null) {
                    SET("kind = #{kind}");
                }

                if (serviceEntity.getDuration() != null) {
                    SET("duration = #{duration}");
                }

                if (serviceEntity.getCount() != -1) {
                    SET("count = #{count}");
                }

                if (serviceEntity.getPrice() != null) {
                    SET("price = #{price}");
                }

                WHERE("id = #{id}");
            }
        }.toString();
    }

}

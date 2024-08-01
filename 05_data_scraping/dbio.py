from dbenv import db, dbtype, user_id, pw, host, er_db_name
from sqlalchemy import create_engine
import pymysql
pymysql.install_as_MySQLdb()

# db에 연결하는 함수
def db_connect() :
    engine = create_engine("%s+%s://%s:%s@%s/%s" %(db, dbtype, user_id, pw, host, er_db_name))
    conn = engine.connect()
    return conn

# db에 저장하는 함수
def er_to_db(table_name, date, df) :
    conn = db_connect()
    
    df.to_sql(table_name, con = conn, if_exists = 'append', index = False)
    conn.close()
    
    return print(f'{table_name}_{date}, {"저장완료":<30s}', end = "\r")
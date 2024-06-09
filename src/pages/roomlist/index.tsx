import roomList from '@/styles/modules/roomList/roomList.module.css';
import { Tab } from '@/components';

const RoomList = () => {
  return (
    <div className={roomList.container}>
      <div className={roomList.contentWrapper}>
        <section className={roomList.infoSection}>
          <article className={roomList.roomInfo}>
            <div className={roomList.roomName}>방 이름</div>
            <div className={roomList.gameImage}>게임 종류 이미지</div>
            <div className={roomList.gameOptions}>옵션 정보 및 인원 정보</div>
          </article>
          <article className={roomList.characterInfo}>캐릭터 정보</article>
        </section>
        <section className={roomList.roomListSection}>
          <section className={roomList.roomListTop}>
            <ul className={roomList.menuGroup}>
              <Tab href="/roomlist" menuName="방 목록" />
              <Tab href="/roomlist" menuName="마이페이지" />
              <Tab href="/roomlist" menuName="사전" />
              <Tab href="/roomlist" menuName="상점" />
              <Tab href="/roomlist" menuName="옵션" />
            </ul>
            <article className={roomList.roomList}>
              <ul className={roomList.optionGroup}>
                <Tab href="/roomlist" menuName="방 만들기" />
                <Tab href="/roomlist" menuName="검색" />
                <Tab href="/roomlist" menuName="필터링" />
                <Tab href="/roomlist" menuName="새로고침" />
                <Tab href="/roomlist" menuName="정렬" />
              </ul>
              <div className={roomList.roomWrapper}>
                {Array.from({ length: 8 }).map((_, index) => (
                  <div key={index} className={roomList.room}>
                    방 번호 {index + 1}
                  </div>
                ))}
              </div>
              <div className={roomList.arrows}>
                <a href="/roomlist">←</a>
                <a href="/roomlist">→</a>
              </div>
            </article>
          </section>
          <article className={roomList.lobbyChat}>로비 채팅 화면</article>
        </section>
      </div>
    </div>
  );
};

export default RoomList;

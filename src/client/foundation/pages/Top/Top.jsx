import moment from "dayjs";
import React, { useState, useCallback, useRef } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";

import { Container } from "../../components/layouts/Container";
import { Spacer } from "../../components/layouts/Spacer";
import { Stack } from "../../components/layouts/Stack";
import { Heading } from "../../components/typographies/Heading";
import { useAuthorizedFetch } from "../../hooks/useAuthorizedFetch";
import { useFetch } from "../../hooks/useFetch";
import { Color, Radius, Space } from "../../styles/variables";
import { authorizedJsonFetcher, jsonFetcher } from "../../utils/HttpUtils";

import { ChargeDialog } from "./internal/ChargeDialog";
import { HeroImage } from "./internal/HeroImage";
import { RecentRaceList } from "./internal/RecentRaceList";

/** @type {React.VFC} */
export const Top = () => {
  const { date = moment().format("YYYY-MM-DD") } = useParams();
  const [zenginCode, setZenginCode] = useState([]);

  const ChargeButton = styled.button`
    background: ${Color.mono[700]};
    border-radius: ${Radius.MEDIUM};
    color: ${Color.mono[0]};
    padding: ${Space * 1}px ${Space * 2}px;

    &:hover {
      background: ${Color.mono[800]};
    }
  `;

  const chargeDialogRef = useRef(null);

  const { data: userData, revalidate } = useAuthorizedFetch(
    "/api/users/me",
    authorizedJsonFetcher,
  );

  const today = moment(date);
  const tomorrow = today.add(1, "day");
  const { data: raceData } = useFetch(
    `/api/races?since=${today.unix()}&until=${tomorrow.unix()}`,
    jsonFetcher,
  );

  const handleClickChargeButton = useCallback(() => {
    if (chargeDialogRef.current === null) {
      return;
    }

    if (zenginCode.length == 0) {
      fetch("/api/zengin")
        .then((res) => res.json())
        .then((data) => {
          setZenginCode(data);
        });
    }
    chargeDialogRef.current.showModal();
  }, []);

  const handleCompleteCharge = useCallback(() => {
    revalidate();
  }, [revalidate]);

  const todayRaces = raceData != null ? [...raceData.races] : [];

  return (
    <Container>
      {<HeroImage url={"/assets/images/hero.webp"} />}

      <Spacer mt={Space * 2} />
      {userData && (
        <Stack horizontal alignItems="center" justifyContent="space-between">
          <div>
            <p>ポイント残高: {userData.balance}pt</p>
            <p>払戻金: {userData.payoff}Yeen</p>
          </div>

          <ChargeButton onClick={handleClickChargeButton}>
            チャージ
          </ChargeButton>
        </Stack>
      )}

      <Spacer mt={Space * 2} />
      <section>
        <Heading as="h1">本日のレース</Heading>
        {todayRaces.length > 0 && (
          <RecentRaceList>
            {todayRaces.map((race) => (
              <RecentRaceList.Item key={race.id} race={race} />
            ))}
          </RecentRaceList>
        )}
      </section>

      <ChargeDialog
        ref={chargeDialogRef}
        zenginCode={zenginCode}
        onComplete={handleCompleteCharge}
      />
    </Container>
  );
};

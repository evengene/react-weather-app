import React from "react";
import { ButtonGroup, ToggleButton } from "react-bootstrap";
import { connect } from "react-redux";

import { IMPERIAL_UNITS, METRIC_UNITS } from "../constants";
import { setUnits as setUnitsAction } from "../redux/actions";

type Units = typeof IMPERIAL_UNITS | typeof METRIC_UNITS;

type OwnProps = {
  className?: string;
};

type StateProps = {
  units: Units;
};

type DispatchProps = {
  setUnits: (units: Units) => void;
};

type Props = OwnProps & StateProps & DispatchProps;

const UnitsSwitcherBase: React.FC<Props> = ({ units, setUnits, className }) => {
  return (
    <div className={`units-switcher ${className ?? ""}`}>
      <div className="d-flex justify-content-between align-items-center mb-2">
        <div className="text-white">Units</div>
        <ButtonGroup>
          <ToggleButton
            id="units-f"
            type="radio"
            variant="outline-light"
            name="units"
            value={IMPERIAL_UNITS}
            checked={units === IMPERIAL_UNITS}
            onChange={() => setUnits(IMPERIAL_UNITS)}
            size="sm"
          >
            ℉
          </ToggleButton>

          <ToggleButton
            id="units-c"
            type="radio"
            variant="outline-light"
            name="units"
            value={METRIC_UNITS}
            checked={units === METRIC_UNITS}
            onChange={() => setUnits(METRIC_UNITS)}
            size="sm"
          >
            ℃
          </ToggleButton>
        </ButtonGroup>
      </div>
    </div>
  );
};

function mapState(state: any): StateProps {
  return {
    units: state.units,
  };
}

const mapDispatch: DispatchProps = {
  setUnits: setUnitsAction,
};

export const UnitsSwitcher = connect(mapState, mapDispatch)(UnitsSwitcherBase);
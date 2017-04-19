/// <reference path="../../../../src/reference.d.ts" />
declare namespace Lightning {
    class PhysicsManager {
        protected game: Engine;
        protected _active: boolean;
        private _physicsWorld;
        private _physicsWorldBounds;
        constructor(game: Engine);
        update(): void;
        startPhysics(): void;
        collideOnWorldBounds(): void;
        readonly physics: Box2D.Dynamics.b2World;
        readonly physicsWorldBounds: Box2D.Dynamics.b2BodyDef;
    }
}

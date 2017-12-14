describe('# Sprite', function() {
    
        var game = new Lightning.Engine(200, 200, {});
        var sprite1, sprite2;
    
        it('Create New Sprite', function() {
            sprite1 = new Lightning.Sprite();
            expect(sprite1 instanceof Lightning.Sprite).toBeTruthy();
        });
    
        it('Add sprite as a child of sprite', function() {
            sprite2 = new Lightning.Sprite();
            sprite1.add(sprite1);
            expect(sprite1.children.length).toBe(1);
        });

        // it('Destroy Sprite To Remove as Child', function() {
        //     sprite2.destroy();
        //     expect(sprite1.children.length).toBe(0);
        // });

        it('Set Anchor (same y for x)', function() {
            sprite1.setAnchor(0.5);
            expect(sprite1.anchor.x === 0.5 && sprite1.anchor.y === 0.5).toBeTruthy();
        });

        it('Set Anchor (different y for x)', function() {
            sprite1.setAnchor(0.5, 0.8);
            expect(sprite1.anchor.x === 0.5 && sprite1.anchor.y === 0.8).toBeTruthy();
        });

        it('Set Scale (same y for x)', function() {
            sprite1.setScale(0.5);
            expect(sprite1.scale.x === 0.5 && sprite1.scale.y === 0.5).toBeTruthy();
        });

        it('Set Scale (different y for x)', function() {
            sprite1.setScale(0.5, 0.8);
            expect(sprite1.scale.x === 0.5 && sprite1.scale.y === 0.8).toBeTruthy();
        });
    });
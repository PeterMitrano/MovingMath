import java.awt.Color;
import java.awt.Graphics;
import java.awt.Graphics2D;

public class Constant extends Term {

	public Constant(RemoveTermListener removeTermListener) {
		super(removeTermListener);
		edit.setText("1");
		weight = 1;
	}

	public Constant(RemoveTermListener removeTermListener, int x, int y) {
		super(removeTermListener, x, y);
		edit.setText("1");
		weight = 1;
	}

	@Override
	protected void paintComponent(Graphics g) {
		super.paintComponent(g);
		Graphics2D g2 = (Graphics2D) g;
		if (weight > 0) {
			g2.setColor(Color.blue);
		} else if (weight < 0) {
			g2.setColor(Color.red);
		} else {
			g2.setColor(Color.white);
		}
		g2.fill(circle);
	}

	public Constant cloneMe(int x, int y) {
		Constant x1 = new Constant(removeTermListener, x, y);
		x1.weight = weight;
		return x1;
	}
}
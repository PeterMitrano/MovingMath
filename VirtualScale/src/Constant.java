import java.awt.Color;
import java.awt.Graphics;
import java.awt.Graphics2D;

public class Constant extends Term {

	public Constant(TermListener termListener) {
		super(termListener);
		coefficientField.setText("1");
		weight = 1;
	}

	public Constant(TermListener termListener, int x, int y) {
		super(termListener, x, y);
		coefficientField.setText("1");
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
			g2.setColor(Color.lightGray);
		}
		g2.fill(circle);
	}

	public Constant cloneMe(int x, int y) {
		Constant x1 = new Constant(termListener, x, y);
		x1.weight = weight;
		return x1;
	}


	@Override
	public boolean positive() {
		return weight> 0;
	}

	@Override
	public boolean negative() {
		return weight< 0;
	}

}
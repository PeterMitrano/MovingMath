import java.awt.Color;
import java.awt.Font;
import java.awt.Graphics;
import java.awt.Graphics2D;

import javax.swing.JLabel;
import javax.swing.JTextField;

public class XBin extends Term {

	JLabel xLabel;
	public static int weight;

	public XBin() {
		super();
		setup();
	}

	public XBin(int x, int y) {
		super(x, y);
		setup();
	}

	public void setup() {
		edit.setText("?");
		edit.setEditable(false);
		edit.setHorizontalAlignment(JTextField.LEFT);
		edit.setLocation(W - 25, 0);
		xLabel = new JLabel("X=");
		xLabel.setFont(new Font("SansSerif", Font.BOLD, 20));
		xLabel.setHorizontalAlignment(JTextField.CENTER);
		xLabel.setBounds(-10, 0, W, W);
		add(xLabel);
	}

	@Override
	protected void paintComponent(Graphics g) {
		super.paintComponent(g);
		Graphics2D g2 = (Graphics2D) g;

		if (XBin.weight == 0) {
			g2.setColor(Color.white);
		} else if (edit.getText().equals("-?")) {
			g2.setColor(Color.red);
		} else {
			g2.setColor(Color.blue);
		}
		g2.fill(circle);
	}

	@Override
	public int updateWeight() {
		if (edit.getText().equals("-?")) {
			return -XBin.weight;
		} else {
			return XBin.weight;
		}

	}

	public XBin cloneMe(int x, int y) {
		XBin x1 = new XBin(x, y);
		x1.weight = weight;
		return x1;
	}
}

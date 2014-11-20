import java.awt.Color;
import java.awt.Font;
import java.awt.Graphics;
import java.awt.Graphics2D;
import java.awt.event.MouseEvent;
import java.awt.event.MouseListener;

import javax.swing.JLabel;
import javax.swing.JOptionPane;
import javax.swing.JTextField;

public class XBin extends Term implements MouseListener {

	JLabel xLabel;
	public static int weight;
	public int coefficient;

	public XBin(RemoveTermListener removeTermListener) {
		super(removeTermListener);
		setup();
	}

	public XBin(RemoveTermListener removeTermListener, int x, int y) {
		super(removeTermListener, x, y);
		setup();
	}

	public void setup() {
		addMouseListener(this);
		edit.setText("1");
		edit.setHorizontalAlignment(JTextField.RIGHT);
		edit.setLocation(5, 0);
		edit.setSize(20, W);
		xLabel = new JLabel("X");
		xLabel.setFont(new Font("SansSerif", Font.BOLD, 16));
		xLabel.setHorizontalAlignment(JTextField.CENTER);
		xLabel.setBounds(W - 30, 0, 20, W);
		add(xLabel);
	}

	@Override
	protected void paintComponent(Graphics g) {
		super.paintComponent(g);
		Graphics2D g2 = (Graphics2D) g;

		if (coefficient == 0) {
			g2.setColor(Color.white);
		} else if (coefficient < 0) {
			g2.setColor(Color.red);
		} else {
			g2.setColor(Color.blue);
		}

		g2.fill(circle);
	}

	@Override
	public int updateWeight() {
		try {
			String val = ScalePanel.xVal.getText().toString();
			XBin.weight = Integer.parseInt(val);
			coefficient = Integer.parseInt(edit.getText().toString());
		} catch (NumberFormatException nfe) {
			JOptionPane.showMessageDialog(this, "Fix your X value!");
		}
		return XBin.weight * coefficient;

	}

	@Override
	public void mouseClicked(MouseEvent me) {
		if (me.getClickCount() == 2) {
			removeTermListener.removeTerm(this);
		} else if (me.getClickCount() == 1) {
			XBin.weight *= -1;
			repaint();
		}
	}

	public XBin cloneMe(int x, int y) {
		XBin x1 = new XBin(removeTermListener, x, y);
		x1.coefficient = this.coefficient;
		return x1;
	}
}

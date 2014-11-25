import java.awt.Color;
import java.awt.Font;
import java.awt.Point;
import java.awt.event.MouseEvent;
import java.awt.event.MouseListener;
import java.awt.event.MouseMotionListener;
import java.awt.geom.Ellipse2D;

import javax.swing.JComponent;
import javax.swing.JOptionPane;
import javax.swing.JTextField;

abstract class Term extends JComponent implements MouseListener,
		MouseMotionListener {

	double weight, rotateDir;
	Ellipse2D circle;
	JTextField coefficientField;
	Point flatLoc, highLoc, lowLoc;
	public static final int W = 50;
	RemoveTermListener removeTermListener;

	public Term(RemoveTermListener removeTermListener) {
		this.removeTermListener = removeTermListener;
		setLayout(null);
		setOpaque(false);
		coefficientField = new JTextField();
		coefficientField.setForeground(Color.black);
		coefficientField.setOpaque(false);
		coefficientField.setBorder(null);
		coefficientField.setDocument(new LengthRestrictedDocument(2));
		coefficientField.setHorizontalAlignment(JTextField.CENTER);
		coefficientField.setFont(new Font("SansSerif", Font.BOLD, 13));
		coefficientField.setSize(W, W);
		coefficientField.setVisible(true);
		coefficientField.addMouseListener(this);
		coefficientField.addMouseMotionListener(this);

		circle = new Ellipse2D.Double();
		circle.setFrame(0, 0, W, W);

		add(coefficientField);
	}

	public Term(RemoveTermListener removeTermListener, int x, int y) {
		this(removeTermListener);
		setLocation(x, y);

		flatLoc = new Point(x, y);
		highLoc = rotate(25);
		lowLoc = rotate(-25);
	}

	private Point rotate(int angle) {

		double theta = Math.toRadians(angle);
		double px = getLocation().x + circle.getCenterX();
		double py = getLocation().y + circle.getCenterY();
		int ox = ScalePanel.center.x;
		int oy = ScalePanel.center.y;

		int newX = (int) (Math.cos(theta) * (px - ox) - Math.sin(theta)
				* (py - oy) + ox);
		int newY = (int) (Math.sin(theta) * (px - ox) + Math.cos(theta)
				* (py - oy) + oy);

		return new Point(newX - W / 2, newY - W / 2);
	}

	public void tiltUp() {
		setLocation(highLoc);
	}

	public void tiltDown() {
		setLocation(lowLoc);
	}

	public void layFlat() {
		setLocation(flatLoc);
	}

	public double updateWeight() {
		try {
			String val = coefficientField.getText().toString();
			weight = Double.parseDouble(val);
		} catch (NumberFormatException nfe) {
			JOptionPane.showMessageDialog(this, "Fix your Term input!");
		}
		return weight;
	}

	public abstract Term cloneMe(int x, int y);

	@Override
	public void mouseDragged(MouseEvent me) {
		setLocation(me.getX(), me.getY());
	}

	@Override
	public void mouseClicked(MouseEvent me) {
		if (me.getClickCount() == 2) {
			int dialogButton = JOptionPane.YES_NO_OPTION;
			int dialogResult = JOptionPane
					.showConfirmDialog(this,
							"Are you sure you want to delete?", "Delete?",
							dialogButton);
			if (dialogResult == 0) {
				removeTermListener.removeTerm(this);
			}
		}
	}

	@Override
	public void mouseEntered(MouseEvent e) {
	}

	@Override
	public void mouseExited(MouseEvent e) {
	}

	@Override
	public void mousePressed(MouseEvent e) {
	}

	@Override
	public void mouseReleased(MouseEvent e) {
	}

	@Override
	public void mouseMoved(MouseEvent e) {
	}

}